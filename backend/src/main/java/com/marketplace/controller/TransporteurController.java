package com.marketplace.controller;

import com.marketplace.dto.CourseTransporteurDTO;
import com.marketplace.dto.TransporteurDisponibleDTO;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.TransporteurService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Affectation des courses : le vendeur propose, le transporteur repond.
 *
 * Les deux points de vue partagent ce controleur parce qu'ils portent sur le meme
 * objet — une course — et que separer les routes n'apporterait qu'une symetrie de
 * facade. L'autorisation est verifiee par ressource dans le service : proprietaire
 * de la vente d'un cote, destinataire de la proposition de l'autre.
 */
@RestController
@RequestMapping("/api/transporteurs")
@RequiredArgsConstructor
public class TransporteurController {

    private final TransporteurService transporteurService;
    private final UserRepository userRepository;

    // ─── Cote vendeur ─────────────────────────────────────────────────────────

    /**
     * GET /api/transporteurs/disponibles
     *
     * Uniquement ceux que la plateforme a valides — identite et permis — et qui
     * ne sont pas deja sur une livraison.
     */
    @GetMapping("/disponibles")
    public ResponseEntity<List<TransporteurDisponibleDTO>> disponibles() {
        return ResponseEntity.ok(transporteurService.listerDisponibles());
    }

    /** POST /api/transporteurs/courses/{remiseId}/proposer */
    @PostMapping("/courses/{remiseId}/proposer")
    public ResponseEntity<Void> proposer(@PathVariable Long remiseId,
                                         @RequestBody PropositionRequest body) {
        transporteurService.proposer(getCurrentUserId(), remiseId, body.getTransporteurId());
        return ResponseEntity.noContent().build();
    }

    /** DELETE /api/transporteurs/courses/{remiseId}/proposition */
    @DeleteMapping("/courses/{remiseId}/proposition")
    public ResponseEntity<Void> annulerProposition(@PathVariable Long remiseId) {
        transporteurService.annulerProposition(getCurrentUserId(), remiseId);
        return ResponseEntity.noContent().build();
    }

    // ─── Cote transporteur ────────────────────────────────────────────────────

    /** GET /api/transporteurs/mes-courses — propositions recues et course en cours. */
    @GetMapping("/mes-courses")
    public ResponseEntity<List<CourseTransporteurDTO>> mesCourses() {
        return ResponseEntity.ok(transporteurService.mesCourses(getCurrentUserId()));
    }

    /** POST /api/transporteurs/courses/{remiseId}/accepter */
    @PostMapping("/courses/{remiseId}/accepter")
    public ResponseEntity<CourseTransporteurDTO> accepter(@PathVariable Long remiseId) {
        return ResponseEntity.ok(transporteurService.accepter(getCurrentUserId(), remiseId));
    }

    /** POST /api/transporteurs/courses/{remiseId}/refuser */
    @PostMapping("/courses/{remiseId}/refuser")
    public ResponseEntity<Void> refuser(@PathVariable Long remiseId,
                                        @RequestBody(required = false) RefusRequest body) {
        transporteurService.refuser(getCurrentUserId(), remiseId,
                body != null ? body.getMotif() : null);
        return ResponseEntity.noContent().build();
    }

    /** GET /api/transporteurs/ma-disponibilite */
    @GetMapping("/ma-disponibilite")
    public ResponseEntity<Map<String, Boolean>> maDisponibilite() {
        return ResponseEntity.ok(Map.of(
                "occupe", transporteurService.aUneCourseEnCours(getCurrentUserId())));
    }

    @Data
    public static class PropositionRequest {
        private Long transporteurId;
    }

    @Data
    public static class RefusRequest {
        private String motif;
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Utilisateur non authentifié");
        }
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
        return user.getId();
    }
}
