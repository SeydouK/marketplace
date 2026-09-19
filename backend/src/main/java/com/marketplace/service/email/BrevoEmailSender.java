package com.marketplace.service.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

/**
 * Envoi via l'API HTTPS transactionnelle de Brevo — compatible avec les
 * hébergeurs qui bloquent le SMTP sortant (Render gratuit). Activé via
 * {@code app.mail.provider=brevo}.
 */
@Component
@ConditionalOnProperty(name = "app.mail.provider", havingValue = "brevo")
public class BrevoEmailSender implements EmailSender {

    private static final String API_URL = "https://api.brevo.com/v3/smtp/email";

    private final RestClient restClient = RestClient.create();

    @Value("${app.mail.brevo.api-key:}")
    private String apiKey;

    @Value("${app.mail.from:no-reply@betailmarket.ci}")
    private String from;

    @Value("${app.mail.from-name:BétailMarket}")
    private String fromName;

    @Override
    public void send(String to, String subject, String htmlContent) {
        Map<String, Object> body = Map.of(
                "sender", Map.of("email", from, "name", fromName),
                "to", List.of(Map.of("email", to)),
                "subject", subject,
                "htmlContent", htmlContent
        );
        restClient.post()
                .uri(API_URL)
                .header("api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }
}
