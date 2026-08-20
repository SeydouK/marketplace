package com.marketplace.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.dto.CommandeDTO;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.GeniusPayService;
import com.marketplace.service.PaiementService;
import com.marketplace.service.VersementService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiements")
@RequiredArgsConstructor
public class PaiementController {

    private static final Logger log = LoggerFactory.getLogger(PaiementController.class);

    private final PaiementService paiementService;
    private final VersementService versementService;
    private final GeniusPayService geniusPayService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // ─── POST /api/paiements/commandes ─────────────────────────────────────────
    @PostMapping("/commandes")
    public ResponseEntity<CommandeDTO> creerCommande() {
        return ResponseEntity.ok(paiementService.creerCommande(getCurrentUserId()));
    }

    // ─── GET /api/paiements/commandes/{id} ─────────────────────────────────────
    @GetMapping("/commandes/{id}")
    public ResponseEntity<CommandeDTO> getCommande(@PathVariable Long id) {
        return ResponseEntity.ok(paiementService.getCommande(getCurrentUserId(), id));
    }

    // ─── POST /api/paiements/webhook/geniuspay (public, signature verifiee) ────
    @PostMapping("/webhook/geniuspay")
    public ResponseEntity<Void> recevoirWebhook(
            @RequestBody String rawBody,
            @RequestHeader(value = "X-Webhook-Signature", required = false) String signature,
            @RequestHeader(value = "X-Webhook-Timestamp", required = false) String timestamp) {

        if (!geniusPayService.verifyWebhookSignature(rawBody, timestamp, signature)) {
            log.warn("Webhook GeniusPay rejeté : signature invalide.");
            return ResponseEntity.status(401).build();
        }

        try {
            JsonNode root = objectMapper.readTree(rawBody);
            String event = root.path("event").asText(null);
            JsonNode data = root.path("data");

            if (event != null && event.startsWith("cashout.")) {
                // La structure exacte du payload cashout n'est pas documentee (cf. GeniusPayService.initiatePayout) :
                // on accepte la reference a la racine de data comme imbriquee sous data.cashout.
                JsonNode cashoutNode = data.has("cashout") ? data.path("cashout") : data;
                String reference = cashoutNode.path("reference").asText(null);
                if (reference != null) {
                    versementService.traiterWebhookCashout(event, reference);
                }
            } else if (event != null) {
                // metadata.order_id sert de repli si la reference ne correspond a aucune commande.
                String reference = data.path("reference").asText(null);
                String orderId = data.path("metadata").path("order_id").asText(null);
                if (reference != null || orderId != null) {
                    paiementService.traiterWebhook(event, reference, orderId);
                }
            }
        } catch (Exception e) {
            log.error("Erreur de traitement du webhook GeniusPay", e);
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.ok().build();
    }

    // ─── Extraction userId depuis le JWT (sub = email) ────────────────────────
    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Utilisateur non authentifié");
        }
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable : " + email));
        return user.getId();
    }
}
