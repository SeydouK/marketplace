package com.marketplace.service.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * Implémentation par défaut, active tant qu'aucun fournisseur SMS n'est configuré.
 *
 * Elle n'envoie rien et trace ce qui serait parti. C'est délibéré : le code de
 * remise reste consultable dans l'application et transmis par email, donc le
 * dispositif fonctionne sans SMS — simplement moins bien. Faire échouer un
 * paiement parce qu'un SMS ne part pas serait hors de proportion.
 *
 * Le numéro est tronqué dans les traces, et le contenu jamais journalisé : un
 * message de remise contient le code.
 */
@Component
@ConditionalOnProperty(name = "app.sms.provider", havingValue = "journal", matchIfMissing = true)
public class SmsSenderJournalise implements SmsSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(SmsSenderJournalise.class);

    @Override
    public void send(String telephone, String message) {
        LOGGER.info("SMS non envoyé (aucun fournisseur configuré) — destinataire {}, {} caractères.",
                masquer(telephone), message == null ? 0 : message.length());
    }

    private String masquer(String telephone) {
        if (telephone == null || telephone.length() < 4) return "inconnu";
        return "***" + telephone.substring(telephone.length() - 4);
    }
}
