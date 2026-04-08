package com.marketplace.dto;

import com.marketplace.model.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private long animalsCount;
    private long pendingHealthValidationCount;

    public UserProfileDTO(
            Long id,
            String name,
            String email,
            Role role,
            long animalsCount,
            long pendingHealthValidationCount
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.animalsCount = animalsCount;
        this.pendingHealthValidationCount = pendingHealthValidationCount;
    }
}
