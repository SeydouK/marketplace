package com.marketplace.service;

import com.marketplace.dto.JwtResponse;
import com.marketplace.dto.LoginRequest;
import com.marketplace.dto.RegisterRequest;
import com.marketplace.exception.BadRequestException;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.security.JwtTokenProvider;
import com.marketplace.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;
import java.time.LocalDateTime;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private static final int EMAIL_TOKEN_EXPIRY_HOURS = 24;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       AuthenticationManager authenticationManager,
                       EmailService emailService ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @Transactional
    public JwtResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Un compte avec cet email existe deja.");
        }

        String verificationToken = UUID.randomUUID().toString();

        User user = User.builder()
            .name(request.getName())
            .surname(request.getSurname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .emailVerificationToken(verificationToken)
            .emailTokenExpiresAt(LocalDateTime.now().plusHours(EMAIL_TOKEN_EXPIRY_HOURS)) // ← NOUVEAU
            .emailVerified(false)
            .badgeVerifie(false)
            .role(Role.ACHETEUR)
            .build();

        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return new JwtResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getName(),
                user.isEmailVerified(),
                user.getKycStatus(),
                user.isDevenirVendeur()
        );

    }

    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Aucun compte n'est associe a cet email."));


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(authentication.getName());
        return new JwtResponse(
            token,
            user.getId(),
            user.getEmail(),
            user.getRole(),
            user.getName(),
            user.isEmailVerified(), 
            user.getKycStatus(),
            user.isDevenirVendeur()
        );
    }

    public void verifyEmail(String token) {
        User user = userRepository
            .findByEmailVerificationToken(token)
            .orElseThrow(() -> new BadRequestException("Token invalide ou expiré."));
    
        if (user.isEmailVerified()) {
            throw new BadRequestException("Email déjà vérifié.");
        }
    
        // ← NOUVEAU : vérifier l'expiration
        if (user.getEmailTokenExpiresAt() == null
                || LocalDateTime.now().isAfter(user.getEmailTokenExpiresAt())) {
            throw new BadRequestException("Token expiré. Veuillez demander un nouvel email de vérification.");
        }
    
        user.setEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailTokenExpiresAt(null); // ← NOUVEAU
        userRepository.save(user);
    }
}
