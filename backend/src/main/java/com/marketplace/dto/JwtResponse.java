package com.marketplace.dto;

import com.marketplace.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import com.marketplace.model.KycStatus;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private Role role;
    private String name;
    private boolean emailVerified;
    private KycStatus kycStatus; 
}
