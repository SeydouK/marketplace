package com.marketplace.dto;

import com.marketplace.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private long listingsCount;
}
