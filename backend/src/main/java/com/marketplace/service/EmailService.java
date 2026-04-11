package com.marketplace.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service 
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender; 

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${app.backend.url}")
    private String backendUrl;

    public void sendVerificationEmail(String toEmail, String token){
        String link = backendUrl + "/api/auth/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Confirmez votre inscription — Marketplace Bétail CI");
        message.setText(
            "Bonjour,\n\n" +
            "Merci de vous être inscrit sur la Plateforme Bétail CI.\n\n" +
            "Cliquez sur le lien ci-dessous pour activer votre compte :\n" +
            link + "\n\n" +
            "Ce lien expire dans 24 heures.\n\n" +
            "L'équipe Bétail CI"
        );

        mailSender.send(message);
    } 
}
