package com.marketplace.service;

import com.marketplace.service.CniVerificationService;
import com.marketplace.dto.CniVerificationResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;
import java.util.List;
import java.util.Map;

// @Service dit à Spring "cette classe est un service, gère-la toi-même"
// Spring va créer une seule instance et l'injecter partout où on en a besoin
@Service
public class CniVerificationService {

    // @Value injecte la valeur depuis application.properties
    // Si la propriété n'existe pas, Spring lance une erreur au démarrage
    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    // WebClient est le client HTTP moderne de Spring (remplace RestTemplate)
    // Il est réactif (non-bloquant), mais on peut l'utiliser de façon synchrone avec .block()
    private final WebClient webClient;

    // ObjectMapper sert à convertir du JSON en objets Java et vice-versa
    private final ObjectMapper objectMapper;

    // Le constructeur : Spring injecte WebClient.Builder automatiquement
    public CniVerificationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    // MultipartFile = fichier envoyé via un formulaire HTTP multipart
    // throws Exception = si quelque chose plante, on laisse remonter l'erreur
    public CniVerificationResult verifyCni(MultipartFile imageFile) throws Exception {

        // --- ÉTAPE 1 : Convertir l'image en Base64 ---
        // Base64 = encodage qui transforme des bytes binaires en texte ASCII
        // C'est nécessaire pour envoyer une image dans un body JSON
        byte[] imageBytes = imageFile.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        // On détermine le type MIME (ex: "image/jpeg", "image/png")
        String mimeType = imageFile.getContentType() != null
            ? imageFile.getContentType()
            : "image/jpeg";

        // --- ÉTAPE 2 : Construire le body de la requête Gemini ---
        // L'API Gemini attend ce format JSON :
        // { "contents": [{ "parts": [ {image}, {text} ] }] }
        //
        // Map.of() crée une Map immuable — c'est du JSON en Java
        // List.of() crée une List immuable

        Map<String, Object> imagePart = Map.of(
            "inline_data", Map.of(
                "mime_type", mimeType,
                "data", base64Image   // L'image encodée en base64
            )
        );

        Map<String, Object> textPart = Map.of(
            "text", """
                Analyse cette image. Est-ce une Carte Nationale d'Identité valide ?
                
                Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks, sans explication.
                Format exact :
                {
                "est_cni_ivoirienne": true,
                "confiance": "haute",
                "surname": "LE NOM DE FAMILLE (ex: KONÉ)", 
                "name": "LE PRÉNOM (ex: Amadou)",
                "numero": "CI1234567",
                "raison": "explication courte"
                }
            """
        );

        // On assemble le body complet
        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(imagePart, textPart))
            )
        );

        // --- ÉTAPE 3 : Appel HTTP à l'API Gemini ---
        String rawResponse = webClient.post()
        .uri(apiUrl + "?key=" + apiKey)
        .header("Content-Type", "application/json")
        .bodyValue(objectMapper.writeValueAsString(requestBody))
        .retrieve()
        .onStatus(
            // Si le statut HTTP est une erreur (4xx ou 5xx)
            status -> status.isError(),
            clientResponse -> clientResponse.bodyToMono(String.class).map(body -> {
                // On crée une exception avec le message d'erreur de Gemini
                if (clientResponse.statusCode().value() == 429) {
                    return new RuntimeException("Quota Gemini dépassé. Réessayez dans quelques secondes.");
                }
                return new RuntimeException("Erreur Gemini (" + clientResponse.statusCode() + "): " + body);
            })
        )
        .bodyToMono(String.class)
        .block();

        // --- ÉTAPE 4 : Parser la réponse ---
        // La réponse Gemini ressemble à :
        // { "candidates": [{ "content": { "parts": [{ "text": "{ ...notre JSON... }" }] } }] }
        JsonNode root = objectMapper.readTree(rawResponse);

        // On navigue dans l'arbre JSON pour extraire le texte généré par Gemini
        String geminiText = root
            .path("candidates").get(0)  // Premier candidat
            .path("content")
            .path("parts").get(0)       // Première partie
            .path("text")
            .asText();

        System.out.println("Réponse Gemini brute : " + geminiText);

        // --- ÉTAPE 5 : Parser le JSON retourné par Gemini ---
        // Gemini retourne parfois du texte avec des backticks markdown, on nettoie
        String cleanJson = geminiText
            .replace("```json", "")
            .replace("```", "")
            .trim();

        JsonNode analysis = objectMapper.readTree(cleanJson);

        // On construit notre objet résultat en lisant les champs du JSON
        // .asBoolean(), .asText() extraient la valeur du noeud JSON
        return new CniVerificationResult(
            analysis.path("est_cni_ivoirienne").asBoolean(false),
            analysis.path("confiance").asText("faible"),
            analysis.path("surname").asText(null),
            analysis.path("name").asText(null),
            analysis.path("numero").asText(null),
            analysis.path("raison").asText("Analyse impossible")
        );
    }
}