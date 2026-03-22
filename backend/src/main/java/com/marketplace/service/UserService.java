package com.marketplace.service;

import com.marketplace.dto.UserProfileDTO;
import com.marketplace.exception.UnauthorizedException;
import com.marketplace.model.User;
import com.marketplace.repository.ListingRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public UserService(UserRepository userRepository, ListingRepository listingRepository) {
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            throw new UnauthorizedException("Utilisateur non authentifie");
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UnauthorizedException("Utilisateur introuvable"));
    }

    public UserProfileDTO getCurrentProfile() {
        User current = getCurrentUser();
        return new UserProfileDTO(
                current.getId(),
                current.getName(),
                current.getEmail(),
                current.getRole(),
                listingRepository.countByUser(current)
        );
    }
}
