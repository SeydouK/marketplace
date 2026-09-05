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

    /**
     * Delai minimal entre deux envois.
     *
     * Dix minutes : assez long pour qu'un renvoi ne serve pas d'outil de
     * harcelement, assez court pour ne pas bloquer quelqu'un qui vient de
     * corriger son filtre anti-spam.
     */
    private static final long DELAI_RENVOI_SECONDES = 600;

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

        // Seuls ces deux roles peuvent etre demandes a l'inscription. Tout le
        // reste (vendeur, veterinaire, admin) s'obtient par une validation.
        Role roleDemande = request.getRole() == Role.TRANSPORTEUR ? Role.TRANSPORTEUR : Role.ACHETEUR;

        String telephone = request.getPhone() != null ? request.getPhone().trim() : null;
        if (roleDemande == Role.TRANSPORTEUR && (telephone == null || telephone.isBlank())) {
            throw new BadRequestException(
                "Un transporteur doit renseigner son numero : c'est par la que les vendeurs le joindront.");
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
            .phone(telephone)
            .role(roleDemande)
            .build();

        user.setVerificationEmailSentAt(LocalDateTime.now());
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
            user.isDevenirVendeur(),
            user.isPermisValide()
        );

    }

    /**
     * Renvoie l'email de verification.
     *
     * Un nouveau jeton est emis a chaque fois plutot que de reexpedier l'ancien :
     * le precedent a pu fuiter dans une boite mal protegee, et sa duree de vie
     * repart de zero, ce qui est precisement ce qu'attend quelqu'un dont le lien
     * a expire. Les liens deja recus cessent donc de fonctionner.
     *
     * @return les secondes restantes avant un prochain renvoi possible, ou 0 si
     *         l'envoi vient d'avoir lieu.
     */
    public RenvoiVerificationResponse renvoyerVerification(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new BadRequestException("Aucun compte n'est associe a cet email."));

        if (user.isEmailVerified()) {
            throw new BadRequestException("Votre adresse est deja verifiee.");
        }

        LocalDateTime maintenant = LocalDateTime.now();
        LocalDateTime dernierEnvoi = user.getVerificationEmailSentAt();

        if (dernierEnvoi != null) {
            long ecoulees = java.time.Duration.between(dernierEnvoi, maintenant).getSeconds();
            if (ecoulees < DELAI_RENVOI_SECONDES) {
                return new RenvoiVerificationResponse(false, DELAI_RENVOI_SECONDES - ecoulees);
            }
        }

        String nouveauJeton = UUID.randomUUID().toString();
        user.setEmailVerificationToken(nouveauJeton);
        user.setEmailTokenExpiresAt(maintenant.plusHours(EMAIL_TOKEN_EXPIRY_HOURS));
        user.setVerificationEmailSentAt(maintenant);
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), nouveauJeton);
        return new RenvoiVerificationResponse(true, DELAI_RENVOI_SECONDES);
    }

    /** Etat du renvoi, pour que le front affiche un decompte plutot qu'une erreur. */
    public record RenvoiVerificationResponse(boolean envoye, long secondesAvantProchainEnvoi) {}

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
            user.isDevenirVendeur(),
            user.isPermisValide()
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
