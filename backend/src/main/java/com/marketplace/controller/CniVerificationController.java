package com.marketplace.controller;

import com.marketplace.dto.CniVerificationResult;
import com.marketplace.service.CniVerificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

// @RestController = @Controller + @ResponseBody
// Chaque méthode retourne directement du JSON au lieu d'une vue HTML
@RestController

// Toutes les routes de ce controller commencent par /api/kyc
@RequestMapping("/api/kyc")

// Autorise les requêtes venant de ton frontend Angular (localhost:4200)
public class CniVerificationController {

    // Spring injecte le service automatiquement via le constructeur
    private final CniVerificationService cniService;

    public CniVerificationController(CniVerificationService cniService) {
        this.cniService = cniService;
    }

    // POST /api/kyc/verify-cni
    // @RequestParam("file") = récupère le fichier depuis le formulaire multipart
    @PostMapping("/verify-cni")
    public ResponseEntity<?> verifyCni(@RequestParam("file") MultipartFile file) {

        // Validation basique avant d'appeler Gemini
        if (file.isEmpty()) {
            // ResponseEntity.badRequest() = HTTP 400
            return ResponseEntity.badRequest().body("Fichier vide.");
        }

        // Vérification du type de fichier
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body("Seules les images sont acceptées.");
        }

        // Limite de taille : 5 MB (5 * 1024 * 1024 bytes)
        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body("Image trop lourde (max 5 MB).");
        }

        try {
            CniVerificationResult result = cniService.verifyCni(file);
            // ResponseEntity.ok() = HTTP 200 avec le résultat en JSON
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            // HTTP 500 = erreur serveur interne
            return ResponseEntity.internalServerError()
                .body("Erreur lors de la vérification : " + e.getMessage());
        }
    }
}
