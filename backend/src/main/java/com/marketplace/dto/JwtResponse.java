package com.marketplace.dto;

import com.marketplace.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private Role role;
    private String name;
}
