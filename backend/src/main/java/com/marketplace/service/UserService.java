package com.marketplace.service;

import com.marketplace.dto.UserProfileDTO;
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

    public UserProfileDTO getCurrentProfile() {
        User current = getCurrentUser();
        long animalsCount = animalSellerRepository.countBySeller(current);
        long pendingHealthValidationCount = isHealthAgent(current.getRole())
                ? animalRepository.countByStatus(AnimalStatus.INDISPONIBLE)
                : 0;

        return new UserProfileDTO(
                current.getId(),
                current.getName(),
                current.getEmail(),
                current.getRole(),
                animalsCount,
                pendingHealthValidationCount
        );
    }

    private boolean isHealthAgent(Role role) {
        return role == Role.AGENT_ANADER
                || role == Role.VETERINAIRE
                || role == Role.ADMIN
                || role == Role.ADMINISTRATEUR;
    }
}
