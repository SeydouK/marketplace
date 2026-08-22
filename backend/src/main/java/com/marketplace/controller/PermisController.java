package com.marketplace.controller;

import com.marketplace.dto.TransporteurDossierDTO;
import com.marketplace.model.TypeVehicule;
import com.marketplace.service.PermisService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/** Dossier du transporteur : permis de conduire et vehicule declare. */
@RestController
@RequestMapping("/api/transporteurs/dossier")
@RequiredArgsConstructor
public class PermisController {

    private final PermisService permisService;

    /** GET /api/transporteurs/dossier — ou en suis-je, et que me manque-t-il ? */
    @GetMapping
    public ResponseEntity<TransporteurDossierDTO> monDossier() {
        return ResponseEntity.ok(permisService.monDossier(emailCourant()));
    }

    /** POST /api/transporteurs/dossier/permis */
    @PostMapping("/permis")
    public ResponseEntity<TransporteurDossierDTO> deposerPermis(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(permisService.deposerPermis(emailCourant(), file));
    }

    /** PUT /api/transporteurs/dossier/vehicule */
    @PutMapping("/vehicule")
    public ResponseEntity<TransporteurDossierDTO> declarerVehicule(@RequestBody VehiculeRequest body) {
        return ResponseEntity.ok(permisService.declarerVehicule(
                emailCourant(), body.getType(), body.getCapaciteTetes()));
    }

    @Data
    public static class VehiculeRequest {
        private TypeVehicule type;
        private Integer capaciteTetes;
    }

    private String emailCourant() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Utilisateur non authentifié");
        }
        return auth.getName();
    }
}
