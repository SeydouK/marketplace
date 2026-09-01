package com.marketplace.controller;

import com.marketplace.dto.ActualiteDTO;
import com.marketplace.dto.ActualiteResumeDTO;
import com.marketplace.service.ActualiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Lecture publique des actualites.
 *
 * Ouverte sans authentification : une alerte sanitaire n'a d'interet que si
 * elle atteint aussi le visiteur qui n'a pas encore de compte.
 */
@RestController
@RequestMapping("/api/actualites")
@RequiredArgsConstructor
public class ActualiteController {

    private final ActualiteService actualiteService;

    @GetMapping
    public ResponseEntity<List<ActualiteResumeDTO>> lister() {
        return ResponseEntity.ok(actualiteService.listerPubliees());
    }

    /**
     * Date du dernier article en ligne, pour la pastille de l'en-tete.
     *
     * Objet plutot que date nue : sans corps JSON structure, l'absence
     * d'actualite et une erreur reseau se ressemblent trop cote client.
     */
    @GetMapping("/derniere-publication")
    public ResponseEntity<Map<String, LocalDateTime>> dernierePublication() {
        LocalDateTime date = actualiteService.dernierePublication();
        return ResponseEntity.ok(date == null
                ? Collections.emptyMap()
                : Map.of("datePublication", date));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActualiteDTO> lire(@PathVariable Long id) {
        return ResponseEntity.ok(actualiteService.lirePubliee(id));
    }
}
