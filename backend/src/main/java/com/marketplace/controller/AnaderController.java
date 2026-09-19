package com.marketplace.controller;

import com.marketplace.dto.AnaderStatsResponse;
import com.marketplace.dto.AnimalSansRfidResponse;
import com.marketplace.dto.RfidInsertionRequest;
import com.marketplace.service.AnaderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Endpoints réservés aux agents ANADER.
 *
 * GET  /api/anader/stats
 *   → KPIs de l'agent connecté (puces insérées, rémunération estimée)
 *
 * GET  /api/anader/animaux-sans-rfid?region=PORO&page=0&size=20
 *   → Animaux DISPONIBLE sans puce, filtrables par région
 *
 * PATCH /api/anader/animaux/{id}/rfid
 *   → Enregistre le numéro RFID et lie l'agent comme inserteur
 */
@RestController
@RequestMapping("/api/anader")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ANADER')")
public class AnaderController {

    private final AnaderService anaderService;

    /** KPIs de l'agent connecté */
    @GetMapping("/stats")
    public ResponseEntity<AnaderStatsResponse> getStats() {
        return ResponseEntity.ok(anaderService.getStats());
    }

    /**
     * Liste paginée des animaux DISPONIBLE sans puce RFID.
     *
     * @param region  Filtre optionnel (ex: "PORO", "GBÊKÊ"). Null = toutes régions.
     * @param page    Numéro de page (défaut: 0)
     * @param size    Taille de page (défaut: 20, max: 50)
     */
    @GetMapping("/animaux-sans-rfid")
    public ResponseEntity<Page<AnimalSansRfidResponse>> getAnimauxSansRfid(
            @RequestParam(required = false) String region,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {

        int safePage = Math.max(0, page);
        int safeSize = Math.min(50, Math.max(1, size));

        PageRequest pageable = PageRequest.of(
            safePage, safeSize,
            Sort.by(Sort.Direction.ASC, "createdAt")
        );

        return ResponseEntity.ok(
            anaderService.getAnimauxSansRfid(region, pageable)
        );
    }

    /**
     * Enregistre la puce RFID sur un animal.
     * L'agent connecté est automatiquement enregistré comme inserteur.
     * Le statut de l'animal reste DISPONIBLE — la puce est un enrichissement,
     * pas un changement d'état.
     */
    @PatchMapping("/animaux/{id}/rfid")
    public ResponseEntity<AnimalSansRfidResponse> insererRfid(
            @PathVariable UUID id,
            @Valid @RequestBody RfidInsertionRequest request) {

        return ResponseEntity.ok(anaderService.insererRfid(id, request));
    }
}