package com.marketplace.service;

import com.marketplace.service.email.EmailSender;
import com.marketplace.service.email.GabaritEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final EmailSender emailSender;
    private final GabaritEmail gabarit;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.backend.url}")
    private String backendUrl;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public EmailService(EmailSender emailSender, GabaritEmail gabarit) {
        this.emailSender = emailSender;
        this.gabarit = gabarit;
    }

    public void sendVerificationEmail(String toEmail, String token) {
        String link = backendUrl + "/api/auth/verify-email?token=" + token;
        String subject = "Confirmez votre inscription — BétailMarket";
        String html = gabarit.page(
                "Plus qu'une étape pour activer votre compte BétailMarket.",
                "Bienvenue sur BétailMarket",
                "<p style=\"margin:0 0 14px\">Merci de vous être inscrit sur la place de marché de l'élevage.</p>"
                        + "<p style=\"margin:0\">Confirmez votre adresse email pour activer votre compte "
                        + "et commencer à acheter ou vendre en toute confiance.</p>",
                "Activer mon compte", link,
                "Ce lien expire dans 24 heures.<br><br>" + GabaritEmail.lienDeSecours(link));

        envoyer(toEmail, subject, html, "de verification");
    }

    /**
     * Lien de reinitialisation du mot de passe.
     *
     * Le lien pointe vers le front, qui porte le formulaire : le jeton ne transite
     * par le backend qu'au moment de la soumission, dans le corps d'une requete
     * POST — jamais dans une URL d'API, qui finirait dans les journaux d'acces.
     */
    public void sendPasswordResetEmail(String toEmail, String prenom, String jeton, long dureeMinutes) {
        String link = frontendUrl + "/auth/reinitialiser-mot-de-passe?jeton=" + jeton;
        String subject = "Réinitialisez votre mot de passe — BétailMarket";
        String html = gabarit.page(
                "Choisissez un nouveau mot de passe pour votre compte.",
                "Réinitialisation du mot de passe",
                "<p style=\"margin:0 0 14px\">Bonjour " + HtmlUtils.htmlEscape(prenom) + ",</p>"
                        + "<p style=\"margin:0\">Nous avons reçu une demande de réinitialisation du mot de passe "
                        + "de votre compte. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.</p>",
                "Choisir un nouveau mot de passe", link,
                "Ce lien est valable " + dureeMinutes + " minutes et ne peut servir qu'une fois. "
                        + "Vous n'êtes pas à l'origine de cette demande ? Ignorez ce message : "
                        + "votre mot de passe actuel reste valable.<br><br>"
                        + GabaritEmail.lienDeSecours(link));

        envoyer(toEmail, subject, html, "de reinitialisation");
    }

    /**
     * Confirmation apres changement du mot de passe.
     *
     * C'est le seul signal qui previent le titulaire legitime si quelqu'un d'autre
     * a pris la main sur sa boite mail et reinitialise son compte.
     */
    public void sendPasswordChangedEmail(String toEmail, String prenom) {
        String link = frontendUrl + "/auth/mot-de-passe-oublie";
        String subject = "Votre mot de passe a été modifié — BétailMarket";
        String html = gabarit.page(
                "Le mot de passe de votre compte vient d'être modifié.",
                "Mot de passe modifié",
                "<p style=\"margin:0 0 14px\">Bonjour " + HtmlUtils.htmlEscape(prenom) + ",</p>"
                        + "<p style=\"margin:0\">Le mot de passe de votre compte BétailMarket vient d'être modifié. "
                        + "Toutes vos autres sessions ont été déconnectées.</p>"
                        + GabaritEmail.encadre("<strong>Ce n'était pas vous ?</strong> Réinitialisez immédiatement "
                        + "votre mot de passe, puis contactez le support.", true),
                "Sécuriser mon compte", link, null);

        envoyer(toEmail, subject, html, "de confirmation de changement de mot de passe");
    }

    /**
     * Envoi commun : l'echec d'un email ne doit jamais faire echouer l'action
     * metier qui l'a declenche.
     */
    private void envoyer(String toEmail, String subject, String html, String nature) {
        if (!mailEnabled) {
            LOGGER.info("Envoi d'email desactive (app.mail.enabled=false) - email {} pour {}", nature, toEmail);
            return;
        }
        try {
            emailSender.send(toEmail, subject, html);
            LOGGER.info("Email {} envoye a {}", nature, toEmail);
        } catch (Exception ex) {
            LOGGER.error("Echec d'envoi de l'email {} a {} : {}", nature, toEmail, ex.getMessage());
        }
    }
}
