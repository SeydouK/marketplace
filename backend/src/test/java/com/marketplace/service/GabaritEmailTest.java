package com.marketplace.service;

import com.marketplace.service.email.GabaritEmail;
import com.marketplace.service.email.SmtpEmailSender;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class GabaritEmailTest {

    @Test
    void leLogoEstServiParLeFrontParDefaut() {
        String html = new GabaritEmail("https://betail.example", "")
                .page("Titre", "<p>Corps</p>", "Agir", "https://betail.example/x");

        assertThat(html)
                .contains("src=\"https://betail.example/assets/email/logo.png\"")
                .contains("alt=\"BétailMarket\"")
                .contains("<p>Corps</p>")
                .contains("href=\"https://betail.example/x\"")
                .contains(">Agir</a>");
    }

    @Test
    void uneUrlDeLogoExpliciteLEmporte() {
        String html = new GabaritEmail("https://betail.example", "https://cdn.example/logo.png")
                .page("Titre", "<p>Corps</p>", null, null);

        assertThat(html).contains("src=\"https://cdn.example/logo.png\"");
    }

    @Test
    void sansBoutonNiNoteLaPageResteValide() {
        String html = new GabaritEmail("https://betail.example", null)
                .page(null, "Titre", "<p>Corps 100 %</p>", null, null, null);

        assertThat(html)
                .contains("<p>Corps 100 %</p>")
                .doesNotContain("display:inline-block;padding:14px 26px");
    }

    @Test
    void unFrontEnLocalhostJointLeLogoAuMessage() {
        String html = new GabaritEmail("http://localhost:4200", "")
                .page("Titre", "<p>Corps</p>", null, null);

        assertThat(html).contains("src=\"cid:" + GabaritEmail.LOGO_CID + "\"");
    }

    @Test
    void lEnvoiSmtpEmbarqueLeLogoReferenceParCid() throws Exception {
        JavaMailSender mailSender = mock(JavaMailSender.class);
        when(mailSender.createMimeMessage()).thenReturn(new MimeMessage(Session.getInstance(new Properties())));
        SmtpEmailSender sender = new SmtpEmailSender(mailSender);
        ReflectionTestUtils.setField(sender, "from", "test@betail.example");

        String html = new GabaritEmail("http://localhost:4200", "").page("Titre", "<p>Corps</p>", null, null);
        sender.send("a@betail.example", "Sujet", html);

        ArgumentCaptor<MimeMessage> envoye = ArgumentCaptor.forClass(MimeMessage.class);
        verify(mailSender).send(envoye.capture());
        ByteArrayOutputStream brut = new ByteArrayOutputStream();
        envoye.getValue().writeTo(brut);
        assertThat(brut.toString(StandardCharsets.UTF_8))
                .contains("Content-ID: <" + GabaritEmail.LOGO_CID + ">")
                .contains("image/png");
    }
}
