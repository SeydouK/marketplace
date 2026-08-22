package com.marketplace.service;

import com.marketplace.model.CommandeItem;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.Versement;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.VersementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Décide quand l'argent encaissé cesse d'être retenu par la plateforme.
 *
 * Service dédié parce que deux chemins très différents y aboutissent — la
 * validation d'un code de remise ({@link RemiseService}) et le suivi de livraison
 * ({@link LivraisonService}) — et qu'une règle de libération dupliquée entre les
 * deux finirait par diverger. Ici, la condition de sortie est écrite une fois.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class SequestreService {

    private static final Logger log = LoggerFactory.getLogger(SequestreService.class);

    private final CommandeItemRepository commandeItemRepository;
    private final VersementRepository versementRepository;

    /**
     * Délai au terme duquel un article seulement <em>déclaré</em> livré libère le
     * versement, faute de confirmation.
     *
     * Ce repli ne concerne que les remises non codées : une remise validée par code
     * passe directement en RECEPTIONNE et libère dans la minute, sans jamais
     * séjourner en LIVRE. Trois jours suffisent donc — sept étaient calibrés pour
     * une époque où ce repli était la voie normale.
     */
    @Value("${app.livraison.delai-liberation-jours:3}")
    private int delaiLiberationJours;

    /**
     * Un article a-t-il quitté le séquestre ?
     *
     * LIVRE au-delà du délai compte comme levé sans être requalifié en RECEPTIONNE :
     * l'acheteur n'a rien confirmé, et la trace doit rester exacte en cas de litige
     * ultérieur.
     */
    public boolean estLeve(CommandeItem item, LocalDateTime maintenant) {
        return switch (item.getStatutLivraison()) {
            case RECEPTIONNE -> true;
            case LIVRE -> item.getLivreAt() != null
                    && !item.getLivreAt().plusDays(delaiLiberationJours).isAfter(maintenant);
            case A_REMETTRE, PRET, EN_LIVRAISON, ECHEC_LIVRAISON, LITIGE -> false;
        };
    }

    /** Date à laquelle un article livré libérera les fonds sans confirmation. */
    public LocalDateTime liberationAutomatiqueLe(CommandeItem item) {
        if (item.getStatutLivraison() != StatutLivraison.LIVRE || item.getLivreAt() == null) {
            return null;
        }
        return item.getLivreAt().plusDays(delaiLiberationJours);
    }

    /**
     * Libère le versement d'un vendeur dès que tous SES articles de la commande sont
     * sortis du séquestre. Un vendeur n'attend donc jamais la livraison d'un autre.
     *
     * @return true si cet appel a effectivement libéré le versement.
     */
    public boolean libererSiLeve(Long commandeId, Long vendeurId) {
        if (vendeurId == null) return false;

        LocalDateTime maintenant = LocalDateTime.now();
        List<CommandeItem> items = commandeItemRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId);
        if (items.isEmpty() || !items.stream().allMatch(i -> estLeve(i, maintenant))) {
            return false;
        }

        Versement versement = versementRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId).orElse(null);
        if (versement == null) {
            log.error("Commande {} / vendeur {} : séquestre levé mais aucun versement à libérer. "
                    + "Intervention manuelle requise.", commandeId, vendeurId);
            return false;
        }
        if (versement.getStatut() != StatutVersement.BLOQUE) {
            return false;
        }

        versement.setStatut(StatutVersement.EN_ATTENTE);
        versement.setLibereAt(maintenant);
        versementRepository.save(versement);
        log.info("Versement {} libéré (commande {}, vendeur {}) : {} XOF en attente d'envoi.",
                versement.getId(), commandeId, vendeurId, versement.getMontantNet());
        return true;
    }

    /** Montant net dû au vendeur, pour l'afficher dans une notification. */
    @Transactional(readOnly = true)
    public java.math.BigDecimal montantNet(Long commandeId, Long vendeurId) {
        return versementRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId)
                .map(Versement::getMontantNet)
                .orElse(null);
    }

    /**
     * Re-gèle un versement libéré mais pas encore parti, quand un litige survient
     * dans l'intervalle. Une fois l'envoi initié, l'argent est hors de portée : le
     * litige est alors tracé, et son traitement revient à l'administrateur.
     */
    public void regelerSiPossible(Long commandeId, Long vendeurId, Long itemId) {
        if (vendeurId == null) return;

        versementRepository.findByCommandeIdAndVendeurId(commandeId, vendeurId)
                .filter(v -> v.getStatut() == StatutVersement.EN_ATTENTE)
                .ifPresent(v -> {
                    v.setStatut(StatutVersement.BLOQUE);
                    v.setLibereAt(null);
                    versementRepository.save(v);
                    log.info("Versement {} re-gelé : litige ouvert sur l'article {}.", v.getId(), itemId);
                });
    }

    /**
     * Libère les versements dont la livraison est constatée depuis assez longtemps
     * sans réaction de l'acheteur.
     */
    @Scheduled(fixedDelayString = "${app.livraison.scan-liberation-ms:3600000}")
    public void libererVersementsEchus() {
        LocalDateTime seuil = LocalDateTime.now().minusDays(delaiLiberationJours);
        List<CommandeItem> echus = commandeItemRepository
                .findByStatutLivraisonAndLivreAtBefore(StatutLivraison.LIVRE, seuil);
        if (echus.isEmpty()) return;

        // Le versement étant par (commande, vendeur), plusieurs articles échus d'un
        // même vendeur ne doivent déclencher qu'une seule tentative de libération.
        echus.stream()
                .filter(i -> i.getVendeurId() != null)
                .map(i -> Map.entry(i.getCommande().getId(), i.getVendeurId()))
                .distinct()
                .forEach(cle -> libererSiLeve(cle.getKey(), cle.getValue()));
    }
}
