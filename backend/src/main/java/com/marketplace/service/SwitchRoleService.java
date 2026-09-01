package com.marketplace.service;

import com.marketplace.dto.AuthResponse;
import com.marketplace.dto.SwitchRoleRequest;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class SwitchRoleService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    /**
     * Rôles autorisés à switcher vers ACHETEUR (et retour).
     * TRANSPORTEUR sera ajouté ici quand il sera créé dans l'enum.
     */
    private static final Set<Role> SWITCHABLE_ROLES = Set.of(Role.VENDEUR);

    @Transactional
    public AuthResponse switchRole(SwitchRoleRequest request) {
        User user = userService.getCurrentUser();
        Role currentRole = user.getRole();
        Role targetRole;

        try {
            targetRole = Role.valueOf(request.getTargetRole());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Rôle invalide : " + request.getTargetRole());
        }

        // Validation : seuls certains rôles peuvent switcher
        if (!SWITCHABLE_ROLES.contains(currentRole) && currentRole != Role.ACHETEUR) {
            throw new ForbiddenException("Votre rôle ne permet pas de changer de mode.");
        }

        // ACHETEUR → son rôle d'origine (VENDEUR uniquement pour l'instant)
        if (currentRole == Role.ACHETEUR) {
            if (!SWITCHABLE_ROLES.contains(targetRole)) {
                throw new ForbiddenException("Vous ne pouvez pas passer au rôle : " + targetRole);
            }
            // Vérifier que l'utilisateur a bien eu ce rôle (devenirVendeur = true)
            if (targetRole == Role.VENDEUR && !user.isDevenirVendeur()) {
                throw new ForbiddenException("Votre demande vendeur n'a pas encore été approuvée.");
            }
        }

        // VENDEUR → ACHETEUR (ou autre switchable → ACHETEUR)
        if (SWITCHABLE_ROLES.contains(currentRole) && targetRole != Role.ACHETEUR) {
            throw new ForbiddenException("Depuis votre rôle actuel, vous ne pouvez switcher que vers ACHETEUR.");
        }

        user.setRole(targetRole);
        userRepository.save(user);

        // Générer un nouveau JWT avec le rôle mis à jour
        String newToken = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(newToken, mapToUserDTO(user));
    }

    private com.marketplace.dto.UserProfileDTO mapToUserDTO(User user) {
        com.marketplace.dto.UserProfileDTO dto = new com.marketplace.dto.UserProfileDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setKycStatus(user.getKycStatus());
        dto.setBadgeVerifie(user.getBadgeVerifie());
        dto.setAvatarUrl(user.getAvatarUrl());
        return dto;
    }
}
