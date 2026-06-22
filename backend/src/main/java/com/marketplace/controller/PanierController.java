package com.marketplace.controller;

import com.marketplace.dto.PanierDTO;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.PanierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/panier")
@RequiredArgsConstructor
public class PanierController {

    private final PanierService panierService;
    private final UserRepository userRepository;

    // ─── GET /api/panier ─────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<PanierDTO> getPanier() {
        return ResponseEntity.ok(panierService.getPanier(getCurrentUserId()));
    }

    // ─── GET /api/panier/count ────────────────────────────────────────────────
    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getNombreArticles() {
        return ResponseEntity.ok(Map.of("count", panierService.getNombreArticles(getCurrentUserId())));
    }

    // ─── POST /api/panier/items ───────────────────────────────────────────────
    @PostMapping("/items")
    public ResponseEntity<PanierDTO> ajouterArticle(@RequestBody AjouterItemRequest request) {
        UUID animalId = UUID.fromString(request.getAnimalId());
        PanierDTO panier = panierService.ajouterArticle(
                getCurrentUserId(),
                animalId,
                request.getQuantite() != null ? request.getQuantite() : 1
        );
        return ResponseEntity.ok(panier);
    }

    // ─── PUT /api/panier/items/{itemId} ───────────────────────────────────────
    @PutMapping("/items/{itemId}")
    public ResponseEntity<PanierDTO> modifierQuantite(
            @PathVariable Long itemId,
            @RequestBody ModifierQuantiteRequest request) {
        return ResponseEntity.ok(panierService.modifierQuantite(getCurrentUserId(), itemId, request.getQuantite()));
    }

    // ─── DELETE /api/panier/items/{itemId} ────────────────────────────────────
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<PanierDTO> supprimerArticle(@PathVariable Long itemId) {
        return ResponseEntity.ok(panierService.supprimerArticle(getCurrentUserId(), itemId));
    }

    // ─── DELETE /api/panier ───────────────────────────────────────────────────
    @DeleteMapping
    public ResponseEntity<Void> viderPanier() {
        panierService.viderPanier(getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    // ─── Extraction userId depuis le JWT (sub = email) ────────────────────────
    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Utilisateur non authentifié");
        }
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable : " + email));
        return user.getId();
    }

    // ─── Request bodies ───────────────────────────────────────────────────────

    static class AjouterItemRequest {
        private String animalId;   // UUID en String depuis le frontend
        private Integer quantite;
        public String getAnimalId() { return animalId; }
        public void setAnimalId(String animalId) { this.animalId = animalId; }
        public Integer getQuantite() { return quantite; }
        public void setQuantite(Integer quantite) { this.quantite = quantite; }
    }

    static class ModifierQuantiteRequest {
        private int quantite;
        public int getQuantite() { return quantite; }
        public void setQuantite(int quantite) { this.quantite = quantite; }
    }
}