package com.marketplace.controller;

import com.marketplace.dto.ActualiteDTO;
import com.marketplace.dto.ActualiteRequest;
import com.marketplace.service.ActualiteService;
import com.marketplace.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Redaction des actualites.
 *
 * Sous {@code /api/admin/**}, donc reserve au role ADMIN par la chaine de
 * securite — inutile de le reverifier ici.
 */
@RestController
@RequestMapping("/api/admin/actualites")
@RequiredArgsConstructor
public class AdminActualiteController {

    private final ActualiteService actualiteService;
    private final UserService userService;

    /** Brouillons compris, contrairement a la liste publique. */
    @GetMapping
    public ResponseEntity<List<ActualiteDTO>> lister() {
        return ResponseEntity.ok(actualiteService.listerTout());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActualiteDTO> lire(@PathVariable Long id) {
        return ResponseEntity.ok(actualiteService.lire(id));
    }

    @PostMapping
    public ResponseEntity<ActualiteDTO> creer(@Valid @RequestBody ActualiteRequest request) {
        Long redacteurId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(actualiteService.creer(request, redacteurId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActualiteDTO> modifier(@PathVariable Long id,
                                                 @Valid @RequestBody ActualiteRequest request) {
        return ResponseEntity.ok(actualiteService.modifier(id, request));
    }

    @PatchMapping("/{id}/publier")
    public ResponseEntity<ActualiteDTO> publier(@PathVariable Long id) {
        return ResponseEntity.ok(actualiteService.changerPublication(id, true));
    }

    @PatchMapping("/{id}/depublier")
    public ResponseEntity<ActualiteDTO> depublier(@PathVariable Long id) {
        return ResponseEntity.ok(actualiteService.changerPublication(id, false));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id) {
        actualiteService.supprimer(id);
        return ResponseEntity.noContent().build();
    }
}
