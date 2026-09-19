package com.marketplace.controller;

import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.MoyenRetraitDTO;
import com.marketplace.dto.MoyenRetraitRequest;
import com.marketplace.dto.UpdateProfileRequest;
import com.marketplace.dto.UserProfileDTO;
import com.marketplace.service.AnimalService;
import com.marketplace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AnimalService animalService;

    public UserController(UserService userService, AnimalService animalService) {
        this.userService = userService;
        this.animalService = animalService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> me() {
        return ResponseEntity.ok(userService.getCurrentProfile());
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileDTO> updateMe(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateCurrentProfile(request.name()));
    }

    @PostMapping(value = "/me/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> updateAvatar(@RequestParam("avatar") MultipartFile avatar) {
        String avatarUrl = userService.updateCurrentAvatar(avatar);
        return ResponseEntity.ok(Map.of("avatarUrl", avatarUrl));
    }

    @PostMapping("/me/seller-request")
    public ResponseEntity<UserProfileDTO> requestSellerAccess() {
        return ResponseEntity.ok(userService.requestSellerAccess());
    }

    // ── Moyen de retrait ────────────────────────────────────────────────────
    // Sous /users/me et non sous /vendeur : c'est une donnee de compte, et un
    // utilisateur qui devient vendeur plus tard ne doit pas avoir a la ressaisir.

    @GetMapping("/me/moyen-retrait")
    public ResponseEntity<MoyenRetraitDTO> moyenRetrait() {
        return ResponseEntity.ok(userService.getMoyenRetrait());
    }

    @PutMapping("/me/moyen-retrait")
    public ResponseEntity<MoyenRetraitDTO> updateMoyenRetrait(
            @Valid @RequestBody MoyenRetraitRequest request) {
        return ResponseEntity.ok(
                userService.updateMoyenRetrait(request.getOperateur(), request.getNumero()));
    }

    @GetMapping("/me/animals")
    public ResponseEntity<List<AnimalDTO>> myAnimals() {
        return ResponseEntity.ok(animalService.listMyAnimals());
    }
}
