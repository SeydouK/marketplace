package com.marketplace.service.email;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

/**
 * Envoi via SMTP (Gmail en local). Implémentation par défaut si
 * {@code app.mail.provider} est absent.
 */
@Component
@ConditionalOnProperty(name = "app.mail.provider", havingValue = "smtp", matchIfMissing = true)
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:${spring.mail.username:no-reply@betailmarket.ci}}")
    private String from;

    public SmtpEmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void send(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            // Le gabarit référence le logo par cid: quand il ne peut pas le servir
            // par URL (front en localhost) : l'image voyage alors avec le message.
            if (htmlContent.contains("cid:" + GabaritEmail.LOGO_CID)) {
                helper.addInline(GabaritEmail.LOGO_CID,
                        new ClassPathResource(GabaritEmail.LOGO_RESSOURCE), "image/png");
            }
            mailSender.send(message);
        } catch (Exception ex) {
            throw new IllegalStateException("Echec SMTP : " + ex.getMessage(), ex);
        }
    }
}
