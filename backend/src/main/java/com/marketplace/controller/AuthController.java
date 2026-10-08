package com.marketplace.controller;

import com.marketplace.dto.JwtResponse;
import com.marketplace.dto.LoginRequest;
import com.marketplace.dto.MotDePasseRequests;
import com.marketplace.dto.RegisterRequest;
import com.marketplace.service.AuthService;
import com.marketplace.service.MotDePasseService;
import org.springframework.beans.factory.annotation.Value;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.frontend.url}")
    private String frontendUrl;

    private final AuthService authService;
    private final MotDePasseService motDePasseService;

    public AuthController(AuthService authService, MotDePasseService motDePasseService) {
        this.authService = authService;
        this.motDePasseService = motDePasseService;
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

    // ── Mot de passe oublie ──────────────────────────────────────────────────

    /**
     * POST /api/auth/mot-de-passe/oublie
     *
     * Reponse identique que l'adresse corresponde a un compte ou non : la route
     * est ouverte, elle ne doit pas servir a decouvrir qui est inscrit.
     */
    @PostMapping("/mot-de-passe/oublie")
    public ResponseEntity<Map<String, String>> motDePasseOublie(
            @Valid @RequestBody MotDePasseRequests.Demande request) {
        motDePasseService.demander(request.email());
        return ResponseEntity.ok(Map.of("message",
                "Si un compte correspond a cette adresse, un lien de reinitialisation vient d'y etre envoye."));
    }

    /** POST /api/auth/mot-de-passe/verifier — le lien est-il encore utilisable ? */
    @PostMapping("/mot-de-passe/verifier")
    public ResponseEntity<Map<String, Boolean>> verifierJeton(
            @Valid @RequestBody MotDePasseRequests.Verification request) {
        return ResponseEntity.ok(Map.of("valide", motDePasseService.jetonValide(request.jeton())));
    }

    /** POST /api/auth/mot-de-passe/reinitialiser */
    @PostMapping("/mot-de-passe/reinitialiser")
    public ResponseEntity<Void> reinitialiser(
            @Valid @RequestBody MotDePasseRequests.Reinitialisation request) {
        motDePasseService.reinitialiser(request.jeton(), request.motDePasse());
        return ResponseEntity.noContent().build();
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
