package com.marketplace.controller;

import com.marketplace.dto.JwtResponse;
import com.marketplace.dto.LoginRequest;
import com.marketplace.dto.RegisterRequest;
import com.marketplace.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.frontend.url}")
    private String frontendUrl;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * POST /api/auth/verification/renvoyer
     *
     * Authentifie : apres inscription l'utilisateur possede deja un jeton. Cela
     * evite qu'une route ouverte permette de decouvrir quels emails ont un compte,
     * ou d'expedier des messages vers une adresse arbitraire.
     */
    @PostMapping("/verification/renvoyer")
    public ResponseEntity<AuthService.RenvoiVerificationResponse> renvoyerVerification() {
        var auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(authService.renvoyerVerification(auth.getName()));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam String token){
        try{
            authService.verifyEmail(token);
            return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(frontendUrl + "/verify-email?status=success"))
                .build();
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(frontendUrl + "/verify-email?status=error"))
                .build();
        }
    } 
}
