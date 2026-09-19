package com.marketplace.controller;

import com.marketplace.dto.MonVersementDTO;
import com.marketplace.service.VersementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Retrait de ses gains par le vendeur.
 *
 * Hors de {@code /api/admin} a dessein : c'est le beneficiaire qui declenche,
 * pas un administrateur. La barriere n'est pas le role mais l'etat des fonds —
 * {@link VersementService#retirer} refuse tout versement qui n'est pas sorti du
 * sequestre, et refuse un versement qui n'appartient pas au demandeur.
 */
@RestController
@RequestMapping("/api/versements")
@RequiredArgsConstructor
public class VersementController {

    private final VersementService versementService;

    /** POST /api/versements/{id}/retirer */
    @PostMapping("/{versementId}/retirer")
    public ResponseEntity<MonVersementDTO> retirer(@PathVariable Long versementId) {
        return ResponseEntity.ok(versementService.retirer(versementId));
    }
}
