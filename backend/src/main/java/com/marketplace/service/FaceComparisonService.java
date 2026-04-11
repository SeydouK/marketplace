package com.marketplace.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class FaceComparisonService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public FaceComparisonService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public boolean compareFaces(MultipartFile cniFile, MultipartFile selfieFile) throws Exception {
        String base64Cni = Base64.getEncoder().encodeToString(cniFile.getBytes());
        String base64Selfie = Base64.getEncoder().encodeToString(selfieFile.getBytes());

        Map<String, Object> cniPart = Map.of(
            "inline_data", Map.of(
                "mime_type", "image/jpeg",
                "data", base64Cni
            )
        );

        Map<String, Object> selfiePart = Map.of(
            "inline_data", Map.of(
                "mime_type", "image/jpeg",
                "data", base64Selfie
            )
        );

        Map<String, Object> textPart = Map.of(
            "text", """
                Compare le visage sur la première image (CNI) avec le visage sur la deuxième image (selfie).
                Est-ce la même personne ?
                Réponds UNIQUEMENT en JSON valide, sans markdown :
                {
                  "meme_personne": true,
                  "confiance": "haute",
                  "raison": "explication courte"
                }
            """
        );

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(cniPart, selfiePart, textPart))
            )
        );

        String rawResponse = webClient.post()
            .uri(apiUrl + "?key=" + apiKey)
            .header("Content-Type", "application/json")
            .bodyValue(objectMapper.writeValueAsString(requestBody))
            .retrieve()
            .bodyToMono(String.class)
            .block();

        JsonNode root = objectMapper.readTree(rawResponse);
        String geminiText = root
            .path("candidates").get(0)
            .path("content")
            .path("parts").get(0)
            .path("text")
            .asText();

        String cleanJson = geminiText
            .replace("```json", "")
            .replace("```", "")
            .trim();

        JsonNode result = objectMapper.readTree(cleanJson);
        String confiance = result.path("confiance").asText("faible");
        boolean memePersonne = result.path("meme_personne").asBoolean(false);

        // On accepte uniquement si confiance haute ou moyenne
        return memePersonne && !confiance.equals("faible");
    }
}