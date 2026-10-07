package com.marketplace.service;

import com.marketplace.model.CommandeItem;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.email.EmailSender;
import com.marketplace.service.email.GabaritEmail;
import com.marketplace.service.sms.SmsSender;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Les messages qui accompagnent une livraison.
 *
 * Deux canaux : email, opérationnel aujourd'hui, et SMS, dont la façade existe
 * mais ne part pas encore faute de fournisseur activé. Sur ce marché le SMS
 * primera largement sur l'email — la bascule ne demandera qu'une implémentation
 * de {@link SmsSender}.
 *
 * <p><strong>Aucun envoi ne doit faire échouer l'action métier.</strong> Un
 * paiement encaissé dont l'email de confirmation part en erreur reste un paiement
 * encaissé : toutes les défaillances sont avalées et tracées.
 */
@Service
@RequiredArgsConstructor
public class NotificationLivraisonService {

    private static final Logger log = LoggerFactory.getLogger(NotificationLivraisonService.class);

    private final EmailSender emailSender;
    private final SmsSender smsSender;
    private final UserRepository userRepository;
    private final GabaritEmail gabaritEmail;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    // ══ Acheteur ════════════════════════════════════════════════════════════

    /**
     * Transmet le code de remise à l'acheteur, juste après l'encaissement.
     *
     * C'est le message le plus important du parcours : sans ce code, l'acheteur
     * ne peut pas prendre livraison, et les fonds restent séquestrés.
     */
    public void envoyerCodeDeRemise(Long acheteurId, Long commandeId, String vendeurNom,
                                    String code, List<CommandeItem> articles) {
        User acheteur = userRepository.findById(acheteurId).orElse(null);
        if (acheteur == null) {
            log.error("Code de remise non transmis : acheteur {} introuvable (commande {}).",
                    acheteurId, commandeId);
            return;
        }

        String animaux = nommer(articles);
        String sujet = "Votre code de remise — commande #" + commandeId;
        String html = gabaritEmail.page(
                "Paiement confirmé : voici le code à donner à la remise de l'animal.",
                "Votre ticket de remise",
                "<p style=\"margin:0\">Votre paiement est confirmé. Voici le code à communiquer à <strong>"
                        + echapper(vendeurNom) + "</strong> au moment où il vous remettra "
                        + echapper(animaux) + ".</p>"
                        + GabaritEmail.code(echapper(code), "Code de remise · commande #" + commandeId)
                        + GabaritEmail.encadre("<strong>Ne donnez ce code qu'au moment où l'animal est entre vos mains.</strong> "
                        + "Sa saisie déclenche le paiement du vendeur : tant qu'il n'est pas donné, "
                        + "votre argent reste protégé par BétailMarket.", true),
                "Ouvrir mon ticket de remise", frontendUrl + "/acheteur/ticket?commande=" + commandeId,
                "Votre ticket reste disponible à tout moment dans «&nbsp;Mes achats&nbsp;» : vous pourrez "
                        + "l'enregistrer en image ou l'envoyer par WhatsApp à la personne qui récupère l'animal.");

        envoyerEmail(acheteur.getEmail(), sujet, html);
        envoyerSms(acheteur.getPhone(), "BetailMarket : votre code de remise pour la commande #"
                + commandeId + " est " + code + ". A donner uniquement lors de la remise de l'animal.");
    }

    /** L'animal est prêt : l'acheteur peut venir le chercher ou attendre le convoyage. */
    public void notifierAnimalPret(Long acheteurId, CommandeItem article) {
        User acheteur = userRepository.findById(acheteurId).orElse(null);
        if (acheteur == null) return;

        String html = gabaritEmail.page(
                "Votre animal est prêt",
                "<p style=\"margin:0 0 14px\"><strong>" + echapper(article.getAnimalNom()) + "</strong> est prêt à être remis"
                        + (article.getLocalisation() != null
                                ? " à " + echapper(article.getLocalisation()) : "") + ".</p>"
                        + "<p style=\"margin:0\">Munissez-vous de votre ticket de remise le jour de la récupération.</p>",
                "Voir ma commande", frontendUrl + "/acheteur/mes-achats");

        envoyerEmail(acheteur.getEmail(), "« " + article.getAnimalNom() + " » est prêt — BétailMarket", html);
        envoyerSms(acheteur.getPhone(), "BetailMarket : " + article.getAnimalNom()
                + " est pret a etre remis. Pensez a votre code de remise.");
    }

    /** La remise a échoué : l'acheteur doit savoir pourquoi et reprendre contact. */
    public void notifierEchecLivraison(Long acheteurId, CommandeItem article, String motif) {
        User acheteur = userRepository.findById(acheteurId).orElse(null);
        if (acheteur == null) return;

        String html = gabaritEmail.page(
                "La remise n'a pas pu avoir lieu",
                "<p style=\"margin:0\">La remise de <strong>" + echapper(article.getAnimalNom())
                        + "</strong> n'a pas abouti.</p>"
                        + GabaritEmail.encadre(echapper(motif), true)
                        + "<p style=\"margin:0\">Votre paiement reste protégé. Contactez le vendeur pour convenir "
                        + "d'une nouvelle date.</p>",
                "Voir ma commande", frontendUrl + "/acheteur/mes-achats");

        envoyerEmail(acheteur.getEmail(), "Remise non aboutie — BétailMarket", html);
        envoyerSms(acheteur.getPhone(), "BetailMarket : la remise de " + article.getAnimalNom()
                + " n'a pas abouti. Votre paiement reste protege.");
    }

    // ══ Vendeur ═════════════════════════════════════════════════════════════

    /** Les fonds sont sortis du séquestre : le vendeur sait qu'il va être payé. */
    public void notifierFondsLiberes(Long vendeurId, Long commandeId, BigDecimal montantNet) {
        User vendeur = userRepository.findById(vendeurId).orElse(null);
        if (vendeur == null) return;

        String montant = montantNet == null ? "" : fcfa(montantNet);
        String html = gabaritEmail.page(
                "Vos fonds sont débloqués",
                "<p style=\"margin:0\">La remise de la commande #" + commandeId + " est confirmée.</p>"
                        + GabaritEmail.montant(montant, "Ce montant sort du séquestre et part au prochain versement."),
                "Voir mes ventes", frontendUrl + "/vendeur/mes-ventes");

        envoyerEmail(vendeur.getEmail(), "Fonds débloqués — commande #" + commandeId, html);
        envoyerSms(vendeur.getPhone(), "BetailMarket : remise confirmee, " + montant
                + " sortent du sequestre pour la commande #" + commandeId + ".");
    }

    /**
     * Previent le vendeur qu'il vient de vendre.
     *
     * <p>Ce message manquait, et c'etait le plus couteux des oublis : le vendeur
     * n'apprenait la vente qu'en ouvrant « Mes ventes » de son propre chef. Rien
     * ne lui disait de preparer l'animal, et la livraison attendait qu'il pense
     * a regarder.
     *
     * <p>Le montant annonce est le net — ce qu'il touchera reellement — et sa
     * decomposition est donnee : decouvrir la commission au moment du virement
     * est le meilleur moyen de perdre un vendeur.
     */
    public void notifierVenteAuVendeur(Long vendeurId, Long commandeId, List<CommandeItem> articles,
                                       BigDecimal montantBrut, BigDecimal fraisPaiement,
                                       BigDecimal commission, BigDecimal montantNet) {
        User vendeur = userRepository.findById(vendeurId).orElse(null);
        if (vendeur == null) {
            log.error("Vente non notifiee : vendeur {} introuvable (commande {}).", vendeurId, commandeId);
            return;
        }

        String animaux = nommer(articles);
        String html = gabaritEmail.page(
                "Vous avez vendu !",
                "<p style=\"margin:0\"><strong>" + echapper(animaux) + "</strong> vient d'être payé"
                        + (articles.size() > 1 ? "s" : "") + " par l'acheteur.</p>"
                        + GabaritEmail.montant(fcfa(montantNet),
                                "Prix de vente " + fcfa(montantBrut)
                                + " &minus; frais de paiement " + fcfa(fraisPaiement)
                                + " &minus; commission BétailMarket " + fcfa(commission))
                        + GabaritEmail.encadre("<strong>Préparez l'animal.</strong> "
                        + "L'argent est encaissé mais reste bloqué chez BétailMarket : il vous sera versé "
                        + "dès que l'acheteur vous aura donné son code de remise, à la livraison.", false),
                "Voir ma vente", frontendUrl + "/vendeur/mes-ventes");

        envoyerEmail(vendeur.getEmail(), "Vente confirmée — commande #" + commandeId, html);
        envoyerSms(vendeur.getPhone(), "BetailMarket : " + animaux + " vendu(s). "
                + fcfa(montantNet) + " a recevoir apres remise. Preparez l'animal.");
    }

    /**
     * Previent le vendeur de la reponse du transporteur.
     *
     * Sans ce message, le vendeur propose une course puis n'a aucun moyen de
     * savoir si quelqu'un l'a prise — sinon en rouvrant l'ecran au hasard.
     */
    public void notifierReponseTransporteur(Long vendeurId, Long commandeId, String transporteurNom,
                                            boolean accepte, String motifRefus) {
        User vendeur = userRepository.findById(vendeurId).orElse(null);
        if (vendeur == null) return;

        String nom = echapper(transporteurNom == null ? "Le transporteur" : transporteurNom);
        String html = accepte
                ? gabaritEmail.page("Course acceptée",
                        "<p style=\"margin:0 0 14px\"><strong>" + nom + "</strong> a accepté la livraison de la commande #"
                                + commandeId + ".</p>"
                                + "<p style=\"margin:0\">Convenez avec lui du moment du chargement. "
                                + "C'est lui qui partagera sa position et saisira le code de remise "
                                + "à l'arrivée.</p>",
                        "Voir la livraison", frontendUrl + "/vendeur/mes-ventes")
                : gabaritEmail.page("Course refusée",
                        "<p style=\"margin:0\"><strong>" + nom + "</strong> a décliné la livraison de la commande #"
                                + commandeId + ".</p>"
                                + (motifRefus == null || motifRefus.isBlank() ? ""
                                        : GabaritEmail.encadre(echapper(motifRefus), true))
                                + "<p style=\"margin:14px 0 0\">La course est de nouveau libre : proposez-la à un autre "
                                + "transporteur, ou livrez vous-même.</p>",
                        "Choisir un transporteur", frontendUrl + "/vendeur/mes-ventes");

        envoyerEmail(vendeur.getEmail(),
                (accepte ? "Course acceptée" : "Course refusée") + " — commande #" + commandeId, html);
        envoyerSms(vendeur.getPhone(), nom
                + (accepte ? " a accepte" : " a refuse") + " la livraison #" + commandeId + ".");
    }

    /** Previent le vendeur que son argent est reellement parti. */
    public void notifierVersementEnvoye(Long vendeurId, Long commandeId, BigDecimal montantNet,
                                        String telephoneDestinataire) {
        User vendeur = userRepository.findById(vendeurId).orElse(null);
        if (vendeur == null) return;

        String html = gabaritEmail.page(
                "Votre versement est parti",
                GabaritEmail.montant(fcfa(montantNet), "Envoyé sur votre Mobile Money"
                        + (telephoneDestinataire == null || telephoneDestinataire.isBlank() ? ""
                                : " (" + echapper(telephoneDestinataire) + ")")
                        + " pour la commande #" + commandeId + ".")
                        + "<p style=\"margin:18px 0 0\">Si vous ne le voyez pas arriver sous 24 h, signalez-le nous.</p>",
                "Voir mes ventes", frontendUrl + "/vendeur/mes-ventes");

        envoyerEmail(vendeur.getEmail(), "Versement envoyé — commande #" + commandeId, html);
        envoyerSms(vendeur.getPhone(), "BetailMarket : " + fcfa(montantNet)
                + " envoyes sur votre Mobile Money pour la commande #" + commandeId + ".");
    }

    // ══ Transporteur ═══════════════════════════════════════════════════════════

    /**
     * Previent le transporteur qu'une course lui est proposee.
     *
     * <p>Sans ce message le modele transporteur ne tient pas : rien ne le
     * prevenait, et il aurait fallu qu'il rouvre « Mes courses » au hasard pour
     * decouvrir une proposition.
     */
    public void notifierCourseProposee(Long transporteurId, Long commandeId, List<CommandeItem> articles,
                                       String lieuChargement, String destination) {
        User transporteur = userRepository.findById(transporteurId).orElse(null);
        if (transporteur == null) {
            log.error("Course non notifiee : transporteur {} introuvable (commande {}).",
                    transporteurId, commandeId);
            return;
        }

        String animaux = nommer(articles);
        String html = gabaritEmail.page(
                "Une course vous est proposée",
                "<p style=\"margin:0\">Un vendeur vous propose de livrer <strong>" + echapper(animaux) + "</strong>.</p>"
                        + GabaritEmail.encadre("<strong>Chargement :</strong> "
                        + echapper(lieuChargement == null ? "à convenir avec le vendeur" : lieuChargement)
                        + "<br><strong>Livraison :</strong> "
                        + echapper(destination == null ? "adresse communiquée à l'acceptation" : destination), false)
                        + "<p style=\"margin:0\">Vous restez libre tant que vous n'avez pas accepté. Une fois la course "
                        + "acceptée, elle vous est réservée jusqu'à la remise.</p>",
                "Voir la course", frontendUrl + "/transporteur/mes-courses");

        envoyerEmail(transporteur.getEmail(), "Course proposée — " + animaux, html);
        envoyerSms(transporteur.getPhone(), "BetailMarket : une course vous est proposee ("
                + animaux + "). Repondez depuis l'application.");
    }

    /**
     * Previent l'acheteur que le livreur est parti.
     *
     * L'acheteur disposait du suivi en direct sans que rien ne lui dise d'aller
     * le regarder. C'est le seul moment du parcours ou il a une raison d'ouvrir
     * la carte.
     */
    public void notifierDepartLivraison(Long acheteurId, Long remiseId, List<CommandeItem> articles,
                                        String livreurNom) {
        User acheteur = userRepository.findById(acheteurId).orElse(null);
        if (acheteur == null) return;

        String animaux = nommer(articles);
        String qui = livreurNom == null || livreurNom.isBlank() ? "Le livreur" : echapper(livreurNom);
        String html = gabaritEmail.page(
                "Votre livraison est en route",
                "<p style=\"margin:0 0 14px\"><strong>" + qui + "</strong> vient de partir avec "
                        + echapper(animaux) + ".</p>"
                        + "<p style=\"margin:0\">Vous pouvez suivre sa progression sur la carte, en direct.</p>"
                        + GabaritEmail.encadre("<strong>Gardez votre ticket de remise à portée</strong> — le code vous sera "
                        + "demandé à l'arrivée, et c'est sa saisie qui déclenche le paiement du vendeur.", false),
                "Suivre la livraison", frontendUrl + "/livraison/suivi/" + remiseId);

        envoyerEmail(acheteur.getEmail(), "En route — " + animaux, html);
        envoyerSms(acheteur.getPhone(), "BetailMarket : " + qui + " est parti avec "
                + animaux + ". Suivez la livraison dans l'application.");
    }

    /**
     * Formate un montant pour l'affichage : « 479 900 FCFA ».
     *
     * L'espace insecable est deliberee : un montant coupe en fin de ligne dans un
     * client mail se lit de travers, et c'est l'information la plus regardee du
     * message.
     */
    private String fcfa(BigDecimal montant) {
        if (montant == null) return "—";
        String chiffres = montant.setScale(0, java.math.RoundingMode.HALF_UP).toPlainString();
        StringBuilder groupe = new StringBuilder();
        int compte = 0;
        for (int i = chiffres.length() - 1; i >= 0; i--) {
            groupe.append(chiffres.charAt(i));
            if (++compte % 3 == 0 && i > 0 && Character.isDigit(chiffres.charAt(i - 1))) {
                groupe.append('\u00a0');
            }
        }
        return groupe.reverse() + "\u00a0FCFA";
    }

    // ══ Envoi ═══════════════════════════════════════════════════════════════

    private void envoyerEmail(String destinataire, String sujet, String html) {
        if (!mailEnabled || destinataire == null || destinataire.isBlank()) return;
        try {
            emailSender.send(destinataire, sujet, html);
        } catch (Exception e) {
            log.error("Echec d'envoi de l'email « {} » : {}", sujet, e.getMessage());
        }
    }

    private void envoyerSms(String telephone, String message) {
        if (telephone == null || telephone.isBlank()) return;
        try {
            smsSender.send(telephone, message);
        } catch (Exception e) {
            log.error("Echec d'envoi du SMS : {}", e.getMessage());
        }
    }

    // ══ Outils ══════════════════════════════════════════════════════════════

    private String nommer(List<CommandeItem> articles) {
        if (articles == null || articles.isEmpty()) return "votre animal";
        return articles.stream().map(CommandeItem::getAnimalNom).collect(Collectors.joining(", "));
    }

    /** Les noms d'animaux sont saisis par les vendeurs : ils ne doivent pas injecter de HTML. */
    private String echapper(String texte) {
        if (texte == null) return "";
        return texte.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
    }
}
