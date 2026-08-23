package com.marketplace.controller;

import com.marketplace.dto.LienConvoyageDTO;
import com.marketplace.dto.MaVenteDTO;
import com.marketplace.dto.MonAchatDTO;
import com.marketplace.dto.SuiviLivraisonDTO;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Transporteur;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.LivraisonService;
import com.marketplace.service.ConvoyageService;
import com.marketplace.service.RemiseService;
import com.marketplace.service.SuiviLivraisonService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Consultation des achats et des ventes, et suivi de la remise des animaux.
 *
 * Les deux listes reposent sur les memes donnees (Commande / CommandeItem) vues
 * depuis les deux bouts de la transaction : l'acheteur suit ce qu'il attend,
 * le vendeur suit ce qu'il doit remettre et ce que la plateforme lui doit.
 */
@RestController
@RequestMapping("/api/livraisons")
@RequiredArgsConstructor
public class LivraisonController {

    private final LivraisonService livraisonService;
    private final RemiseService remiseService;
    private final ConvoyageService convoyageService;
    private final SuiviLivraisonService suiviService;
    private final UserRepository userRepository;

    // ─── Acheteur ─────────────────────────────────────────────────────────────

    /** GET /api/livraisons/mes-achats */
    @GetMapping("/mes-achats")
    public ResponseEntity<List<MonAchatDTO>> mesAchats() {
        return ResponseEntity.ok(livraisonService.listMesAchats(getCurrentUserId()));
    }

    /** POST /api/livraisons/articles/{itemId}/confirmer-reception */
    @PostMapping("/articles/{itemId}/confirmer-reception")
    public ResponseEntity<MonAchatDTO> confirmerReception(@PathVariable Long itemId) {
        return ResponseEntity.ok(livraisonService.confirmerReception(getCurrentUserId(), itemId));
    }

    /** POST /api/livraisons/articles/{itemId}/litige */
    @PostMapping("/articles/{itemId}/litige")
    public ResponseEntity<MonAchatDTO> ouvrirLitige(@PathVariable Long itemId,
                                                    @RequestBody LitigeRequest body) {
        return ResponseEntity.ok(
                livraisonService.ouvrirLitige(getCurrentUserId(), itemId, body.getMotif()));
    }

    // ─── Vendeur ──────────────────────────────────────────────────────────────

    /** GET /api/livraisons/mes-ventes */
    @GetMapping("/mes-ventes")
    public ResponseEntity<List<MaVenteDTO>> mesVentes() {
        return ResponseEntity.ok(livraisonService.listMesVentes(getCurrentUserId()));
    }

    /**
     * POST /api/livraisons/articles/{itemId}/prise-en-charge
     *
     * Corps optionnel : transporteur et reference de suivi. Laisses vides aujourd'hui,
     * ils seront renseignes par l'integration Yango.
     */
    @PostMapping("/articles/{itemId}/prise-en-charge")
    public ResponseEntity<MaVenteDTO> declarerPriseEnCharge(
            @PathVariable Long itemId,
            @RequestBody(required = false) PriseEnChargeRequest body) {
        Transporteur transporteur = body != null ? body.getTransporteur() : null;
        String tracking = body != null ? body.getTrackingReference() : null;
        return ResponseEntity.ok(
                livraisonService.declarerPriseEnCharge(getCurrentUserId(), itemId, transporteur, tracking));
    }

    /** POST /api/livraisons/articles/{itemId}/depot */
    @PostMapping("/articles/{itemId}/depot")
    public ResponseEntity<MaVenteDTO> declarerDepot(@PathVariable Long itemId) {
        return ResponseEntity.ok(livraisonService.declarerDepot(getCurrentUserId(), itemId));
    }

    /**
     * POST /api/livraisons/remises/{commandeId}/valider
     *
     * Le vendeur saisit le code que l'acheteur lui communique, photo a l'appui.
     * C'est ce geste qui solde la vente et libere les fonds.
     */
    @PostMapping("/remises/{commandeId}/valider")
    public ResponseEntity<Map<String, Object>> validerRemise(@PathVariable Long commandeId,
                                                             @RequestBody ValidationRemiseRequest body) {
        // Resout le vendeur derriere l'appelant : le transporteur affecte remet
        // l'animal pour son compte, et c'est a lui que l'acheteur dicte le code.
        int soldes = remiseService.validerCodeParLivreur(
                getCurrentUserId(), commandeId, body.getItemIds(), body.getCode(), body.getPhotoUrl());
        return ResponseEntity.ok(Map.of("articlesSoldes", soldes));
    }

    /** POST /api/livraisons/articles/{itemId}/pret — le vendeur declare l'animal pret. */
    @PostMapping("/articles/{itemId}/pret")
    public ResponseEntity<MaVenteDTO> declarerPret(@PathVariable Long itemId) {
        return ResponseEntity.ok(livraisonService.declarerPret(getCurrentUserId(), itemId));
    }

    /** POST /api/livraisons/articles/{itemId}/echec — la remise n'a pas pu avoir lieu. */
    @PostMapping("/articles/{itemId}/echec")
    public ResponseEntity<MaVenteDTO> declarerEchec(@PathVariable Long itemId,
                                                     @RequestBody EchecRequest body) {
        return ResponseEntity.ok(livraisonService.declarerEchec(getCurrentUserId(), itemId, body.getMotif()));
    }

    // ─── Suivi de livraison ───────────────────────────────────────────────────

    /**
     * PUT /api/livraisons/remises/{remiseId}/destination
     *
     * L'acheteur choisit entre retrait sur place et livraison, et dit ou livrer.
     */
    @PutMapping("/remises/{remiseId}/destination")
    public ResponseEntity<SuiviLivraisonDTO> definirDestination(@PathVariable Long remiseId,
                                                                 @RequestBody DestinationRequest body) {
        return ResponseEntity.ok(suiviService.definirDestination(
                getCurrentUserId(), remiseId, body.getMode(), body.getAdresseLigne(),
                body.getVille(), body.getIndications(), body.getDestinataireNom(),
                body.getDestinataireTelephone(), body.getLatitude(), body.getLongitude()));
    }

    /** POST /api/livraisons/remises/{remiseId}/depart — le vendeur prend la route. */
    @PostMapping("/remises/{remiseId}/depart")
    public ResponseEntity<SuiviLivraisonDTO> demarrerLivraison(@PathVariable Long remiseId) {
        return ResponseEntity.ok(suiviService.demarrerLivraison(getCurrentUserId(), remiseId));
    }

    /**
     * POST /api/livraisons/remises/{remiseId}/position
     *
     * Appele en boucle par le telephone du livreur. Reponse volontairement vide :
     * c'est l'appel le plus frequent du systeme, il ne doit rien couter de plus
     * qu'une ecriture.
     */
    @PostMapping("/remises/{remiseId}/position")
    public ResponseEntity<Void> enregistrerPosition(@PathVariable Long remiseId,
                                                     @RequestBody PositionRequest body) {
        suiviService.enregistrerPosition(getCurrentUserId(), remiseId,
                body.getLatitude(), body.getLongitude(),
                body.getVitesseKmh(), body.getCapDegres(), body.getPrecisionM());
        return ResponseEntity.noContent().build();
    }

    /** GET /api/livraisons/remises/{remiseId}/suivi — ouvert a l'acheteur, au vendeur et au transporteur. */
    @GetMapping("/remises/{remiseId}/suivi")
    public ResponseEntity<SuiviLivraisonDTO> suivre(@PathVariable Long remiseId) {
        return ResponseEntity.ok(suiviService.suivre(getCurrentUserId(), remiseId));
    }

    /**
     * POST /api/livraisons/remises/{remiseId}/confier
     *
     * Le vendeur confie le convoyage a quelqu'un qu'il connait et recupere le lien
     * a lui envoyer, ainsi qu'un lien WhatsApp pre-rempli.
     */
    @PostMapping("/remises/{remiseId}/confier")
    public ResponseEntity<LienConvoyageDTO> confierConvoyage(@PathVariable Long remiseId,
                                                              @RequestBody ConfierRequest body) {
        return ResponseEntity.ok(convoyageService.confier(
                getCurrentUserId(), remiseId, body.getNom(), body.getTelephone()));
    }

    /** DELETE /api/livraisons/remises/{remiseId}/convoyage — revoque le lien. */
    @DeleteMapping("/remises/{remiseId}/convoyage")
    public ResponseEntity<Void> revoquerConvoyage(@PathVariable Long remiseId) {
        convoyageService.revoquer(getCurrentUserId(), remiseId);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/livraisons/remises/{remiseId}/trace
     *
     * Le parcours reellement emprunte. Separe du suivi : il ne change pas au meme
     * rythme, et le renvoyer a chaque sondage gonflerait inutilement la reponse.
     */
    @GetMapping("/remises/{remiseId}/trace")
    public ResponseEntity<List<com.marketplace.dto.PointTraceDTO>> trace(@PathVariable Long remiseId) {
        return ResponseEntity.ok(suiviService.trace(getCurrentUserId(), remiseId));
    }

    // ─── Admin ────────────────────────────────────────────────────────────────

    /** POST /api/livraisons/articles/{itemId}/arbitrage (role verifie dans le service) */
    @PostMapping("/articles/{itemId}/arbitrage")
    public ResponseEntity<MaVenteDTO> arbitrerLitige(@PathVariable Long itemId,
                                                     @RequestBody ArbitrageRequest body) {
        return ResponseEntity.ok(livraisonService.arbitrerLitige(itemId, body.isEnFaveurDuVendeur()));
    }

    // ─── Corps de requete ─────────────────────────────────────────────────────

    @Data
    public static class LitigeRequest {
        private String motif;
    }

    @Data
    public static class PriseEnChargeRequest {
        private Transporteur transporteur;
        private String trackingReference;
    }

    @Data
    public static class ArbitrageRequest {
        private boolean enFaveurDuVendeur;
    }

    @Data
    public static class ValidationRemiseRequest {
        /** Les animaux effectivement remis — permet la remise en plusieurs fois. */
        private List<Long> itemIds;
        private String code;
        /** Preuve de remise, obligatoire. */
        private String photoUrl;
    }

    @Data
    public static class EchecRequest {
        private String motif;
    }

    @Data
    public static class DestinationRequest {
        private ModeRemise mode;
        private String adresseLigne;
        private String ville;
        /** Reperes de proximite — l'adressage postal est rare. */
        private String indications;
        private String destinataireNom;
        private String destinataireTelephone;
        private java.math.BigDecimal latitude;
        private java.math.BigDecimal longitude;
    }

    @Data
    public static class ConfierRequest {
        private String nom;
        /** Numero au format international, indicatif compris. */
        private String telephone;
    }

    @Data
    public static class PositionRequest {
        private java.math.BigDecimal latitude;
        private java.math.BigDecimal longitude;

        // Fournis par l'API de geolocalisation du navigateur, tous facultatifs :
        // un materiel qui ne les donne pas ne doit pas faire echouer l'envoi.
        private java.math.BigDecimal vitesseKmh;
        private java.math.BigDecimal capDegres;
        private Integer precisionM;
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
