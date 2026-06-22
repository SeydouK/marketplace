package com.marketplace.dto;

import com.marketplace.model.Role;
import com.marketplace.model.KycStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private boolean emailVerified;
    private KycStatus kycStatus;
    private boolean devenirVendeur;
    private long animalsCount;
    private long pendingHealthValidationCount;
    private String avatarUrl;

    public UserProfileDTO(
            Long id,
            String name,
            String email,
            Role role,
            boolean emailVerified,
            KycStatus kycStatus,
            boolean devenirVendeur,
            long animalsCount,
            long pendingHealthValidationCount,
            String avatarUrl
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.emailVerified = emailVerified;
        this.kycStatus = kycStatus;
        this.devenirVendeur = devenirVendeur;
        this.animalsCount = animalsCount;
        this.pendingHealthValidationCount = pendingHealthValidationCount;
        this.avatarUrl = avatarUrl;
    }
}
