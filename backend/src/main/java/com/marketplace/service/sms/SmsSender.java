package com.marketplace.service.sms;

/**
 * Envoi bas niveau d'un SMS.
 *
 * Décalque volontaire de {@link com.marketplace.service.email.EmailSender} : le
 * jour où un fournisseur est activé, il suffit d'ajouter une implémentation
 * conditionnée par {@code app.sms.provider}, sans toucher aux appelants.
 *
 * Brevo — déjà utilisé pour l'email en production — diffuse aussi du SMS, donc
 * l'ouverture du canal ne demandera pas de nouveau prestataire, seulement un
 * crédit et une clé.
 */
public interface SmsSender {

    void send(String telephone, String message);
}
