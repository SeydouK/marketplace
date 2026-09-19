package com.marketplace.controller;

import com.marketplace.dto.ConvoyageDTO;
import com.marketplace.service.ConvoyageService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * L'écran du convoyeur, ouvert par un lien.
 *
 * <p>Ces routes sont publiques au sens de Spring Security, mais <strong>pas au
 * sens du contrôle d'accès</strong> : le jeton présent dans l'URL fait office
 * d'authentification, et {@link ConvoyageService#resoudreJeton} le vérifie avant
 * chaque action — existence, non-révocation, non-expiration.
 *
 * <p>C'est un compromis assumé. Exiger un compte du convoyeur garantirait qu'il
 * n'utilise pas l'outil : sur une seule course, personne ne s'inscrit. Le jeton
 * est long, aléatoire, lié à une remise et périssable ; il n'ouvre qu'une vue
 * réduite, sans prix ni code de remise.
 */
@RestController
@RequestMapping("/api/convoyage")
@RequiredArgsConstructor
public class ConvoyageController {

    private final ConvoyageService convoyageService;

    /** GET /api/convoyage/{jeton} — ce que le convoyeur doit savoir, et rien de plus. */
    @GetMapping("/{jeton}")
    public ResponseEntity<ConvoyageDTO> consulter(@PathVariable String jeton) {
        return ResponseEntity.ok(convoyageService.vue(jeton));
    }

    /** POST /api/convoyage/{jeton}/depart — le convoyeur prend la route. */
    @PostMapping("/{jeton}/depart")
    public ResponseEntity<ConvoyageDTO> demarrer(@PathVariable String jeton) {
        return ResponseEntity.ok(convoyageService.demarrer(jeton));
    }

    /**
     * POST /api/convoyage/{jeton}/position
     *
     * Appel le plus frequent du parcours : reponse vide, aucun traitement annexe.
     */
    @PostMapping("/{jeton}/position")
    public ResponseEntity<Void> position(@PathVariable String jeton,
                                         @RequestBody PositionRequest body) {
        convoyageService.enregistrerPosition(jeton, body.getLatitude(), body.getLongitude());
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/convoyage/{jeton}/photo
     *
     * Point d'entree dedie : /api/files/upload exige un compte, que le convoyeur
     * n'a pas. Le jeton autorise le depot.
     */
    @PostMapping("/{jeton}/photo")
    public ResponseEntity<Map<String, String>> deposerPhoto(@PathVariable String jeton,
                                                            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(Map.of("url", convoyageService.deposerPhoto(jeton, file)));
    }

    /** POST /api/convoyage/{jeton}/remise — saisie du code dicte par l'acheteur. */
    @PostMapping("/{jeton}/remise")
    public ResponseEntity<Map<String, Object>> validerRemise(@PathVariable String jeton,
                                                             @RequestBody RemiseRequest body) {
        int soldes = convoyageService.validerRemise(
                jeton, body.getArticleIds(), body.getCode(), body.getPhotoUrl());
        return ResponseEntity.ok(Map.of("articlesSoldes", soldes));
    }

    @Data
    public static class PositionRequest {
        private BigDecimal latitude;
        private BigDecimal longitude;
    }

    @Data
    public static class RemiseRequest {
        private List<Long> articleIds;
        private String code;
        private String photoUrl;
    }
}
