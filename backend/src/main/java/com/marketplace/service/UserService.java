package com.marketplace.service;

import com.marketplace.dto.SellerRequestDTO;
import com.marketplace.dto.UserProfileDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.UnauthorizedException;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.AnimalSellerRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AnimalSellerRepository animalSellerRepository;
    private final AnimalRepository animalRepository;

    public UserService(
            UserRepository userRepository,
            AnimalSellerRepository animalSellerRepository,
            AnimalRepository animalRepository
    ) {
        this.userRepository = userRepository;
        this.animalSellerRepository = animalSellerRepository;
        this.animalRepository = animalRepository;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            throw new UnauthorizedException("Utilisateur non authentifie");
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UnauthorizedException("Utilisateur introuvable"));
    }

    public Optional<User> getCurrentUserIfAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            return Optional.empty();
        }

        return userRepository.findByEmail(authentication.getName());
    }

    @Transactional(readOnly = true)
    public UserProfileDTO getCurrentProfile() {
        return toUserProfile(getCurrentUser());
    }

    @Transactional
    public UserProfileDTO requestSellerAccess() {
        User current = getCurrentUser();

        if (current.getRole() != Role.USER && current.getRole() != Role.ACHETEUR) {
            throw new BadRequestException("Seuls les comptes utilisateur standards peuvent demander l'acces vendeur.");
        }

        if (isSellerRole(current.getRole())) {
            throw new BadRequestException("Votre compte dispose deja d'un acces vendeur.");
        }

        if (current.isDevenirVendeur()) {
            throw new BadRequestException("Votre demande pour devenir vendeur est deja en attente.");
        }

        current.setDevenirVendeur(true);
        userRepository.save(current);
        return toUserProfile(current);
    }

    @Transactional(readOnly = true)
    public List<SellerRequestDTO> listPendingSellerRequests() {
        ensureAdminRole(getCurrentUser());

        return userRepository.findByDevenirVendeurTrueOrderByUpdatedAtDesc()
                .stream()
                .filter(user -> !isSellerRole(user.getRole()))
                .map(this::toSellerRequestDto)
                .toList();
    }

    @Transactional
    public SellerRequestDTO approveSellerRequest(Long userId) {
        ensureAdminRole(getCurrentUser());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("Utilisateur introuvable."));

        if (!user.isDevenirVendeur()) {
            throw new BadRequestException("Cet utilisateur n'a pas de demande vendeur en attente.");
        }

        user.setRole(Role.VENDEUR);
        user.setDevenirVendeur(false);
        userRepository.save(user);
        return toSellerRequestDto(user);
    }

    private UserProfileDTO toUserProfile(User current) {
        long animalsCount = animalSellerRepository.countBySeller(current);
        long pendingHealthValidationCount = isHealthAgent(current.getRole())
                ? animalRepository.countByStatus(AnimalStatus.INDISPONIBLE)
                : 0;

        return new UserProfileDTO(
                current.getId(),
                current.getName(),
                current.getEmail(),
                current.getRole(),
                current.isEmailVerified(),
                current.getKycStatus(),
                current.isDevenirVendeur(),
                animalsCount,
                pendingHealthValidationCount
        );
    }

    private SellerRequestDTO toSellerRequestDto(User user) {
        return new SellerRequestDTO(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getRole(),
                user.isEmailVerified(),
                user.getKycStatus(),
                user.isDevenirVendeur(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private boolean isSellerRole(Role role) {
        return role == Role.VENDEUR || role == Role.ADMIN || role == Role.ADMINISTRATEUR;
    }

    private void ensureAdminRole(User user) {
        if (user.getRole() != Role.ADMIN && user.getRole() != Role.ADMINISTRATEUR) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    private boolean isHealthAgent(Role role) {
        return role == Role.AGENT_ANADER
                || role == Role.VETERINAIRE
                || role == Role.ADMIN
                || role == Role.ADMINISTRATEUR;
    }
}
