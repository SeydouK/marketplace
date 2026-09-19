package com.marketplace.service.email;

/**
 * Envoi bas niveau d'un email HTML. L'implémentation est choisie via
 * {@code app.mail.provider} : {@code smtp} en local, {@code brevo} en production
 * (API HTTPS, compatible avec les hébergeurs qui bloquent le SMTP sortant comme
 * Render gratuit).
 */
public interface EmailSender {

    void send(String to, String subject, String htmlContent);
}
