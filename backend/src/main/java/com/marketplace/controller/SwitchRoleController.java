package com.marketplace.controller;

import com.marketplace.dto.AuthResponse;
import com.marketplace.dto.SwitchRoleRequest;
import com.marketplace.service.SwitchRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class SwitchRoleController {

    private final SwitchRoleService switchRoleService;

    /**
     * POST /api/auth/switch-role
     * Body: { "targetRole": "ACHETEUR" } ou { "targetRole": "VENDEUR" }
     * Retourne un nouveau JWT + profil mis à jour.
     */
    @PostMapping("/switch-role")
    public ResponseEntity<AuthResponse> switchRole(@RequestBody SwitchRoleRequest request) {
        return ResponseEntity.ok(switchRoleService.switchRole(request));
    }
}
