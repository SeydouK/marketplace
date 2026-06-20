package com.marketplace.service;

import com.marketplace.service.email.EmailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final EmailSender emailSender;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.backend.url}")
    private String backendUrl;

    public EmailService(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendVerificationEmail(String toEmail, String token) {
        String link = backendUrl + "/api/auth/verify-email?token=" + token;
        String subject = "Confirmez votre inscription — BétailMarket";
        String html = """
                <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;color:#2A2620">
                  <h2 style="color:#1B4332">Bienvenue sur BétailMarket</h2>
                  <p>Merci de vous être inscrit sur la marketplace de l'élevage.</p>
                  <p>Cliquez sur le bouton ci-dessous pour activer votre compte :</p>
                  <p style="text-align:center;margin:28px 0">
                    <a href="%s" style="background:#2D6A4F;color:#fff;text-decoration:none;
                       padding:14px 28px;border-radius:12px;font-weight:700;display:inline-block">
                      Activer mon compte
                    </a>
                  </p>
                  <p style="font-size:13px;color:#6B6358">Ou copiez ce lien : <br>%s</p>
                  <p style="font-size:13px;color:#6B6358">Ce lien expire dans 24 heures.</p>
                  <p style="font-size:13px;color:#6B6358">— L'équipe BétailMarket</p>
                </div>
                """.formatted(link, link);

        if (!mailEnabled) {
            LOGGER.info("Envoi d'email desactive (app.mail.enabled=false) - destinataire {}", toEmail);
            return;
        }
        try {
            emailSender.send(toEmail, subject, html);
            LOGGER.info("Email de verification envoye a {}", toEmail);
        } catch (Exception ex) {
            // Ne pas faire échouer l'inscription si l'envoi du mail échoue
            LOGGER.error("Echec d'envoi de l'email de verification a {} : {}", toEmail, ex.getMessage());
        }
    }
}
