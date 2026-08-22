package com.marketplace.service;

import com.marketplace.dto.ConvoyageDTO;
import com.marketplace.dto.LienConvoyageDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Remise;
import com.marketplace.model.StatutLivraison;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

/**
 * Confier un convoyage à quelqu'un qui n'a pas de compte.
 *
 * <p>Le vendeur qui ne peut pas conduire s'arrange avec un convoyeur qu'il connaît
 * déjà — le transporteur est son sous-traitant, pas un acteur choisi par
 * l'acheteur. Lui imposer une inscription pour une seule course garantirait qu'il
 * ne le fasse pas : on lui envoie un lien, il l'ouvre, il roule.
 *
 * <p>Le jeton tient lieu d'authentification. Il donne accès à une vue réduite —
 * adresse, destinataire, départ, saisie du code — et à <strong>rien</strong> de
 * commercial. Surtout pas au code de remise : c'est l'acheteur qui le lui dira sur
 * place, et c'est précisément ce qui empêche un convoyeur de valider une livraison
 * qui n'a pas eu lieu.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ConvoyageService {

    private static final Logger log = LoggerFactory.getLogger(ConvoyageService.class);

    private static final SecureRandom ALEA = new SecureRandom();

    /** 32 octets : un jeton qui remplace un mot de passe doit être hors de portée du hasard. */
    private static final int OCTETS_JETON = 32;

    /** Le lien survit quelques jours à la remise, le temps d'un litige ou d'une reprise. */
    private static final int VALIDITE_JOURS = 7;

    private final RemiseRepository remiseRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final SuiviLivraisonService suiviService;
    private final RemiseService remiseService;
    private final FileStorageService fileStorageService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    // ══ Côté vendeur ════════════════════════════════════════════════════════

    /**
     * Génère le lien à envoyer au convoyeur.
     *
     * @param telephone numéro au format international complet, indicatif compris.
     */
    public LienConvoyageDTO confier(Long vendeurId, Long remiseId, String nom, String telephone) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));

        if (!Objects.equals(remise.getVendeurId(), vendeurId)) {
            throw new ForbiddenException("Cette livraison ne fait pas partie de vos ventes.");
        }
        if (remise.getModeRemise() != ModeRemise.TRANSPORT) {
            throw new BadRequestException(
                    "Cette vente est en retrait sur place : l'acheteur vient chercher l'animal.");
        }

        String numero = normaliserNumero(telephone);

        // Le jeton n'est genere qu'une fois : reconfier a quelqu'un d'autre ne doit
        // pas laisser le lien precedent actif.
        remise.setConvoyageJeton(genererJeton());
        remise.setTransporteurNom(nom != null && !nom.isBlank() ? nom.trim() : null);
        remise.setTransporteurTelephone(numero);
        remise.setConvoyageConfieAt(LocalDateTime.now());
        remise.setConvoyageExpireAt(LocalDateTime.now().plusDays(VALIDITE_JOURS));
        remiseRepository.save(remise);

        List<CommandeItem> articles = articles(remise);
        String lien = frontendUrl + "/convoyage/" + remise.getConvoyageJeton();

        log.info("Convoyage de la remise {} confié à {} (vendeur {}).",
                remiseId, masquer(numero), vendeurId);

        return new LienConvoyageDTO(lien, construireLienWhatsApp(numero, lien, remise, articles),
                numero, remise.getTransporteurNom(), remise.getConvoyageExpireAt());
    }

    /** Révoque le lien — le convoyeur ne répond plus, ou le vendeur change d'avis. */
    public void revoquer(Long vendeurId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));
        if (!Objects.equals(remise.getVendeurId(), vendeurId)) {
            throw new ForbiddenException("Cette livraison ne fait pas partie de vos ventes.");
        }

        remise.setConvoyageJeton(null);
        remise.setConvoyageExpireAt(null);
        remiseRepository.save(remise);
        log.info("Lien de convoyage de la remise {} révoqué.", remiseId);
    }

    // ══ Côté convoyeur ══════════════════════════════════════════════════════

    /** Résout un jeton, ou refuse. Aucune donnée commerciale n'en sort. */
    @Transactional(readOnly = true)
    public Remise resoudreJeton(String jeton) {
        if (jeton == null || jeton.isBlank()) {
            throw new ResourceNotFoundException("Lien de convoyage invalide.");
        }
        Remise remise = remiseRepository.findByConvoyageJeton(jeton)
                .orElseThrow(() -> new ResourceNotFoundException("Lien de convoyage invalide ou révoqué."));

        if (!remise.convoyageActif(LocalDateTime.now())) {
            throw new ForbiddenException("Ce lien de convoyage a expiré.");
        }
        return remise;
    }

    /**
     * Vue du convoyeur.
     *
     * Construite champ par champ plutôt qu'en réutilisant le DTO acheteur : une
     * omission par recopie se remarque, une omission par oubli dans un objet
     * partagé se découvre en production.
     */
    @Transactional(readOnly = true)
    public ConvoyageDTO vue(String jeton) {
        Remise remise = resoudreJeton(jeton);
        List<CommandeItem> articles = articles(remise);

        boolean toutRemis = !articles.isEmpty() && articles.stream()
                .allMatch(i -> i.getStatutLivraison() == StatutLivraison.RECEPTIONNE);

        return new ConvoyageDTO(
                remise.getId(),
                remise.getTransporteurNom(),
                articles.stream().map(CommandeItem::getAnimalNom).toList(),
                articles.stream().map(CommandeItem::getId).toList(),
                // Où charger : l'animal est chez le vendeur.
                articles.isEmpty() ? null : articles.get(0).getLocalisation(),
                remise.getAdresseLigne(),
                remise.getAdresseVille(),
                remise.getAdresseIndications(),
                remise.getDestinataireNom(),
                remise.getDestinataireTelephone(),
                remise.getDestinationLatitude(),
                remise.getDestinationLongitude(),
                remise.getDepartAt(),
                remise.getCommandeId(),
                toutRemis
        );
    }

    // ══ Actions du convoyeur ═══════════════════════════════════════════════
    //
    // Toutes agissent pour le compte du vendeur : le jeton l'a mandate, et
    // reutiliser les services existants garantit que les memes garde-fous
    // s'appliquent — sequestre, litige, double remise.

    public ConvoyageDTO demarrer(String jeton) {
        Remise remise = resoudreJeton(jeton);
        suiviService.demarrerLivraison(remise.getVendeurId(), remise.getId());
        return vue(jeton);
    }

    public void enregistrerPosition(String jeton, java.math.BigDecimal latitude,
                                    java.math.BigDecimal longitude) {
        Remise remise = resoudreJeton(jeton);
        suiviService.enregistrerPosition(remise.getVendeurId(), remise.getId(), latitude, longitude);
    }

    /**
     * Depot de la photo de remise.
     *
     * Passe par un point d'entree dedie : /api/files/upload exige un compte, et le
     * convoyeur n'en a pas. Le jeton fait ici office d'autorisation, et sa validite
     * est verifiee avant tout ecriture.
     */
    public String deposerPhoto(String jeton, org.springframework.web.multipart.MultipartFile fichier) {
        resoudreJeton(jeton);
        return fileStorageService.store(fichier, "ANIMAL_PHOTO").getUrl();
    }

    /** Saisie du code que l'acheteur vient de dicter. */
    public int validerRemise(String jeton, List<Long> articleIds, String code, String photoUrl) {
        Remise remise = resoudreJeton(jeton);
        return remiseService.validerCode(
                remise.getVendeurId(), remise.getCommandeId(), articleIds, code, photoUrl);
    }

    // ══ Numéro et lien ══════════════════════════════════════════════════════

    /**
     * Ramène un numéro à sa forme internationale.
     *
     * L'indicatif est exigé plutôt que déduit : supposer la Côte d'Ivoire
     * condamnerait la plateforme à un seul pays, et un numéro mal deviné envoie le
     * lien à un inconnu.
     */
    public String normaliserNumero(String saisi) {
        if (saisi == null || saisi.isBlank()) {
            throw new BadRequestException("Indiquez le numéro du convoyeur.");
        }

        String chiffres = saisi.replaceAll("[^0-9+]", "");
        if (chiffres.startsWith("+")) {
            chiffres = chiffres.substring(1);
        }
        if (chiffres.startsWith("00")) {
            chiffres = chiffres.substring(2);
        }

        if (chiffres.length() < 8 || chiffres.length() > 15) {
            throw new BadRequestException(
                    "Numéro invalide. Attendu : indicatif du pays suivi du numéro, par exemple +225 07 01 02 03 04.");
        }
        return "+" + chiffres;
    }

    /**
     * Lien « click-to-chat ».
     *
     * Volontairement pas l'API WhatsApp Business : elle exige un compte Meta, un
     * intermédiaire agréé et des modèles de message approuvés. Ici le message part
     * du WhatsApp du vendeur — donc d'un contact que le convoyeur connaît, ce qui
     * inspire plus confiance qu'un numéro automatique.
     */
    private String construireLienWhatsApp(String numero, String lien,
                                          Remise remise, List<CommandeItem> articles) {
        String animaux = articles.isEmpty()
                ? "un animal"
                : String.join(", ", articles.stream().map(CommandeItem::getAnimalNom).toList());

        String destination = remise.getAdresseVille() != null
                ? remise.getAdresseVille()
                : (remise.getAdresseLigne() != null ? remise.getAdresseLigne() : "l'adresse indiquée");

        String message = "Bonjour"
                + (remise.getTransporteurNom() != null ? " " + remise.getTransporteurNom() : "")
                + ", je vous confie le convoyage de : " + animaux + " vers " + destination + ".\n\n"
                + "Ouvrez ce lien pour démarrer et partager votre position :\n" + lien + "\n\n"
                + "À l'arrivée, l'acheteur vous donnera un code à 4 chiffres à saisir dans le lien, "
                + "avec une photo de l'animal remis.";

        // wa.me veut le numero sans le +.
        return "https://wa.me/" + numero.replace("+", "")
                + "?text=" + URLEncoder.encode(message, StandardCharsets.UTF_8);
    }

    private String genererJeton() {
        byte[] octets = new byte[OCTETS_JETON];
        ALEA.nextBytes(octets);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(octets);
    }

    private List<CommandeItem> articles(Remise remise) {
        return commandeItemRepository.findByCommandeIdAndVendeurId(
                remise.getCommandeId(), remise.getVendeurId());
    }

    /** Les numéros ne doivent pas se retrouver en clair dans les journaux. */
    private String masquer(String numero) {
        return numero.length() < 4 ? "***" : "***" + numero.substring(numero.length() - 4);
    }
}
