package com.marketplace.service;

import com.marketplace.config.GeniusPayProperties;
import com.marketplace.exception.BadRequestException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.Map;

@Service
public class GeniusPayService {

    private static final Logger log = LoggerFactory.getLogger(GeniusPayService.class);
    private static final String HMAC_ALGO = "HmacSHA256";
    private static final long WEBHOOK_TOLERANCE_SECONDS = 300;
    /** Borne l'attente : cet appel est fait pendant une requete utilisateur, il ne doit jamais la bloquer. */
    private static final Duration STATUS_TIMEOUT = Duration.ofSeconds(8);

    private final GeniusPayProperties properties;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public GeniusPayService(GeniusPayProperties properties, WebClient.Builder webClientBuilder) {
        this.properties = properties;
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public record PaymentCreationResult(String reference, String checkoutUrl) {
    }

    public record PayoutResult(String reference, String statut) {
    }

    public PaymentCreationResult createPayment(BigDecimal montant, String description,
                                                Map<String, String> metadata,
                                                String successUrl, String errorUrl) {

        Map<String, Object> requestBody = Map.of(
                "amount", montant,
                "description", description,
                "metadata", metadata,
                "success_url", successUrl,
                "error_url", errorUrl
        );

        String rawResponse = webClient.post()
                .uri(properties.getBaseUrl() + "/payments")
                .header("X-API-Key", properties.getApiKey())
                .header("X-API-Secret", properties.getApiSecret())
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.isError(), clientResponse ->
                        clientResponse.bodyToMono(String.class).map(body -> {
                            log.warn("Erreur GeniusPay ({}) : {}", clientResponse.statusCode(), body);
                            return new BadRequestException("Le paiement n'a pas pu être initié auprès de GeniusPay.");
                        })
                )
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode data = objectMapper.readTree(rawResponse).path("data");
            String reference = data.path("reference").asText(null);
            String checkoutUrl = data.path("checkout_url").asText(null);
            if (reference == null || checkoutUrl == null) {
                throw new BadRequestException("Réponse GeniusPay invalide : référence ou checkout_url manquant.");
            }
            return new PaymentCreationResult(reference, checkoutUrl);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Impossible de parser la réponse GeniusPay", e);
            throw new BadRequestException("Réponse GeniusPay illisible.");
        }
    }

    /**
     * Lit le statut réel d'un paiement chez GeniusPay (source de vérité).
     * Sert de réconciliation quand le webhook tarde ou se perd.
     *
     * @return "pending", "processing", "completed", "failed", "expired", ou null si illisible.
     */
    public String getPaymentStatus(String reference) {
        String rawResponse = webClient.get()
                .uri(properties.getBaseUrl() + "/payments/" + reference)
                .header("X-API-Key", properties.getApiKey())
                .header("X-API-Secret", properties.getApiSecret())
                .retrieve()
                .onStatus(status -> status.isError(), clientResponse ->
                        clientResponse.bodyToMono(String.class).map(body -> {
                            log.warn("Erreur GeniusPay ({}) sur la lecture du paiement {} : {}",
                                    clientResponse.statusCode(), reference, body);
                            return new BadRequestException("Statut du paiement illisible auprès de GeniusPay.");
                        })
                )
                .bodyToMono(String.class)
                .block(STATUS_TIMEOUT);

        try {
            return objectMapper.readTree(rawResponse).path("data").path("status").asText(null);
        } catch (Exception e) {
            log.error("Impossible de parser le statut GeniusPay pour {}", reference, e);
            return null;
        }
    }

    /**
     * Initie un versement (payout) vers un numéro Mobile Money.
     *
     * ⚠️ NON VÉRIFIÉ — CE CODE N'A AUCUNE SOURCE.
     * Vérification faite le 19/08/2026 contre https://pay.genius.ci/docs/api : l'API de versement
     * n'y est pas documentée du tout (aucun endpoint, aucun corps de requête, aucune réponse).
     * Tout ce qui suit — le chemin "/payouts", "wallet_id", "recipient", "destination",
     * "idempotency_key", la structure de réponse — est une hypothèse non confirmée.
     * Seuls les événements webhook sont documentés, et ils s'appellent "cashout.*" (pas "payout.*"),
     * ce qui suggère que l'endpoint réel est plutôt "/cashouts".
     * → Obtenir la spec auprès de support@genius.ci avant d'utiliser cette méthode.
     */
    public PayoutResult initiatePayout(BigDecimal montant, String recipientName, String recipientPhone,
                                        String recipientEmail, String description,
                                        Map<String, String> metadata, String idempotencyKey) {

        if (properties.getWalletId() == null || properties.getWalletId().isBlank()) {
            throw new BadRequestException(
                    "Wallet GeniusPay non configuré (geniuspay.wallet-id / GENIUSPAY_WALLET_ID). "
                    + "Récupérez l'ID du wallet marchand depuis le dashboard GeniusPay avant d'envoyer un versement.");
        }
        if (recipientPhone == null || recipientPhone.isBlank()) {
            throw new BadRequestException("Le vendeur n'a pas de numéro de téléphone renseigné : versement impossible.");
        }

        Map<String, Object> requestBody = Map.of(
                "wallet_id", properties.getWalletId(),
                "recipient", Map.of("name", recipientName, "phone", recipientPhone, "email",
                        recipientEmail != null ? recipientEmail : ""),
                "destination", Map.of("type", "mobile_money", "account", recipientPhone),
                "amount", montant,
                "currency", "XOF",
                "description", description,
                "metadata", metadata,
                "idempotency_key", idempotencyKey
        );

        String rawResponse = webClient.post()
                .uri(properties.getBaseUrl() + "/payouts")
                .header("X-API-Key", properties.getApiKey())
                .header("X-API-Secret", properties.getApiSecret())
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.isError(), clientResponse ->
                        clientResponse.bodyToMono(String.class).map(body -> {
                            log.warn("Erreur payout GeniusPay ({}) : {}", clientResponse.statusCode(), body);
                            return new BadRequestException("Le versement n'a pas pu être initié auprès de GeniusPay.");
                        })
                )
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode data = objectMapper.readTree(rawResponse).path("data");
            JsonNode payoutNode = data.has("payout") ? data.path("payout") : data;
            String reference = payoutNode.path("reference").asText(null);
            String statut = payoutNode.path("status").asText("pending");
            if (reference == null) {
                throw new BadRequestException("Réponse GeniusPay invalide : référence de versement manquante.");
            }
            return new PayoutResult(reference, statut);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Impossible de parser la réponse de versement GeniusPay", e);
            throw new BadRequestException("Réponse GeniusPay illisible.");
        }
    }

    /** Vérifie signature = HMAC-SHA256(timestamp + "." + rawBody, webhookSecret) + tolérance anti-replay de 5 min. */
    public boolean verifyWebhookSignature(String rawBody, String timestamp, String signature) {
        if (rawBody == null || timestamp == null || signature == null) return false;

        try {
            long ts = Long.parseLong(timestamp);
            if (Math.abs(System.currentTimeMillis() / 1000 - ts) > WEBHOOK_TOLERANCE_SECONDS) {
                log.warn("Webhook GeniusPay rejeté : timestamp hors tolérance.");
                return false;
            }
        } catch (NumberFormatException e) {
            return false;
        }

        String payload = timestamp + "." + rawBody;
        try {
            Mac mac = Mac.getInstance(HMAC_ALGO);
            mac.init(new SecretKeySpec(properties.getWebhookSecret().getBytes(StandardCharsets.UTF_8), HMAC_ALGO));
            byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            String expected = bytesToHex(hash);
            return MessageDigest.isEqual(
                    expected.getBytes(StandardCharsets.UTF_8),
                    signature.getBytes(StandardCharsets.UTF_8)
            );
        } catch (Exception e) {
            log.error("Erreur lors de la vérification de la signature webhook GeniusPay", e);
            return false;
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}
