package com.marketplace.controller;

import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.ProfilVendeurDTO;
import com.marketplace.service.UserPublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserPublicController {

    private final UserPublicService userPublicService;

    /** Profil public d'un vendeur — sans email ni téléphone */
    @GetMapping("/{id}/profil-public")
    public ResponseEntity<ProfilVendeurDTO> getProfilPublic(@PathVariable Long id) {
        return ResponseEntity.ok(userPublicService.getProfilPublic(id));
    }

    /** Annonces d'un vendeur, triées par date desc */
    @GetMapping("/{id}/annonces")
    public ResponseEntity<List<AnimalDTO>> getAnnoncesVendeur(@PathVariable Long id) {
        return ResponseEntity.ok(userPublicService.getAnnoncesVendeur(id));
    }
}
