package com.marketplace.controller;

import com.marketplace.dto.MaVenteDTO;
import com.marketplace.dto.MonAchatDTO;
import com.marketplace.model.Transporteur;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.LivraisonService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Consultation des achats et des ventes, et suivi de la remise des animaux.
 *
 * Les deux listes reposent sur les memes donnees (Commande / CommandeItem) vues
 * depuis les deux bouts de la transaction : l'acheteur suit ce qu'il attend,
 * le vendeur suit ce qu'il doit remettre et ce que la plateforme lui doit.
 */
@RestController
@RequestMapping("/api/livraisons")
@RequiredArgsConstructor
public class LivraisonController {

    private final LivraisonService livraisonService;
    private final UserRepository userRepository;

    // ─── Acheteur ─────────────────────────────────────────────────────────────

    /** GET /api/livraisons/mes-achats */
    @GetMapping("/mes-achats")
    public ResponseEntity<List<MonAchatDTO>> mesAchats() {
        return ResponseEntity.ok(livraisonService.listMesAchats(getCurrentUserId()));
    }

    /** POST /api/livraisons/articles/{itemId}/confirmer-reception */
    @PostMapping("/articles/{itemId}/confirmer-reception")
    public ResponseEntity<MonAchatDTO> confirmerReception(@PathVariable Long itemId) {
        return ResponseEntity.ok(livraisonService.confirmerReception(getCurrentUserId(), itemId));
    }

    /** POST /api/livraisons/articles/{itemId}/litige */
    @PostMapping("/articles/{itemId}/litige")
    public ResponseEntity<MonAchatDTO> ouvrirLitige(@PathVariable Long itemId,
                                                    @RequestBody LitigeRequest body) {
        return ResponseEntity.ok(
                livraisonService.ouvrirLitige(getCurrentUserId(), itemId, body.getMotif()));
    }

    // ─── Vendeur ──────────────────────────────────────────────────────────────

    /** GET /api/livraisons/mes-ventes */
    @GetMapping("/mes-ventes")
    public ResponseEntity<List<MaVenteDTO>> mesVentes() {
        return ResponseEntity.ok(livraisonService.listMesVentes(getCurrentUserId()));
    }

    /**
     * POST /api/livraisons/articles/{itemId}/prise-en-charge
     *
     * Corps optionnel : transporteur et reference de suivi. Laisses vides aujourd'hui,
     * ils seront renseignes par l'integration Yango.
     */
    @PostMapping("/articles/{itemId}/prise-en-charge")
    public ResponseEntity<MaVenteDTO> declarerPriseEnCharge(
            @PathVariable Long itemId,
            @RequestBody(required = false) PriseEnChargeRequest body) {
        Transporteur transporteur = body != null ? body.getTransporteur() : null;
        String tracking = body != null ? body.getTrackingReference() : null;
        return ResponseEntity.ok(
                livraisonService.declarerPriseEnCharge(getCurrentUserId(), itemId, transporteur, tracking));
    }

    /** POST /api/livraisons/articles/{itemId}/depot */
    @PostMapping("/articles/{itemId}/depot")
    public ResponseEntity<MaVenteDTO> declarerDepot(@PathVariable Long itemId) {
        return ResponseEntity.ok(livraisonService.declarerDepot(getCurrentUserId(), itemId));
    }

    // ─── Admin ────────────────────────────────────────────────────────────────

    /** POST /api/livraisons/articles/{itemId}/arbitrage (role verifie dans le service) */
    @PostMapping("/articles/{itemId}/arbitrage")
    public ResponseEntity<MaVenteDTO> arbitrerLitige(@PathVariable Long itemId,
                                                     @RequestBody ArbitrageRequest body) {
        return ResponseEntity.ok(livraisonService.arbitrerLitige(itemId, body.isEnFaveurDuVendeur()));
    }

    // ─── Corps de requete ─────────────────────────────────────────────────────

    @Data
    public static class LitigeRequest {
        private String motif;
    }

    @Data
    public static class PriseEnChargeRequest {
        private Transporteur transporteur;
        private String trackingReference;
    }

    @Data
    public static class ArbitrageRequest {
        private boolean enFaveurDuVendeur;
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
}
