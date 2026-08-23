package com.marketplace.service;

import com.marketplace.dto.EvenementLivraisonDTO;
import com.marketplace.model.AuteurEvenement;
import com.marketplace.model.LivraisonEvenement;
import com.marketplace.model.SourceEvenement;
import com.marketplace.model.TypeEvenementLivraison;
import com.marketplace.repository.LivraisonEvenementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Écriture et lecture du journal de livraison.
 *
 * Volontairement sans dépendance métier : n'importe quel service peut y consigner
 * un événement sans risque de cycle. Le journal ne décide de rien, il enregistre.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class JournalLivraisonService {

    private final LivraisonEvenementRepository repository;

    /** Consigne un événement produit par une personne. */
    public LivraisonEvenement enregistrer(Long commandeItemId,
                                          TypeEvenementLivraison type,
                                          AuteurEvenement auteurType,
                                          Long auteurId,
                                          String commentaire) {
        return enregistrer(commandeItemId, type, auteurType, auteurId,
                SourceEvenement.APP, commentaire, null);
    }

    /** Consigne un événement produit par un traitement automatique. */
    public LivraisonEvenement enregistrerSysteme(Long commandeItemId,
                                                 TypeEvenementLivraison type,
                                                 String commentaire) {
        return enregistrer(commandeItemId, type, AuteurEvenement.SYSTEME, null,
                SourceEvenement.SCHEDULER, commentaire, null);
    }

    public LivraisonEvenement enregistrer(Long commandeItemId,
                                          TypeEvenementLivraison type,
                                          AuteurEvenement auteurType,
                                          Long auteurId,
                                          SourceEvenement source,
                                          String commentaire,
                                          String photoUrl) {
        LivraisonEvenement evenement = new LivraisonEvenement();
        evenement.setCommandeItemId(commandeItemId);
        evenement.setType(type);
        evenement.setAuteurType(auteurType);
        evenement.setAuteurId(auteurId);
        evenement.setSource(source);
        evenement.setCommentaire(commentaire);
        evenement.setPhotoUrl(photoUrl);
        return repository.save(evenement);
    }

    @Transactional(readOnly = true)
    public List<LivraisonEvenement> frise(Long commandeItemId) {
        return repository.findByCommandeItemIdOrderByCreatedAtAsc(commandeItemId);
    }

    /** Frises de plusieurs articles, indexées par article — évite le N+1. */
    @Transactional(readOnly = true)
    public Map<Long, List<EvenementLivraisonDTO>> frises(Collection<Long> commandeItemIds) {
        if (commandeItemIds.isEmpty()) return Map.of();
        return repository.findByCommandeItemIdInOrderByCreatedAtAsc(commandeItemIds).stream()
                .collect(Collectors.groupingBy(
                        LivraisonEvenement::getCommandeItemId,
                        Collectors.mapping(JournalLivraisonService::toDTO, Collectors.toList())));
    }

    /** Frise d'un seul article, prête à être exposée. */
    @Transactional(readOnly = true)
    public List<EvenementLivraisonDTO> friseDTO(Long commandeItemId) {
        return frise(commandeItemId).stream().map(JournalLivraisonService::toDTO).toList();
    }

    private static EvenementLivraisonDTO toDTO(LivraisonEvenement e) {
        return new EvenementLivraisonDTO(
                e.getId(), e.getType(), libelle(e.getType()), e.getAuteurType(),
                e.getCommentaire(), e.getPhotoUrl(), e.getCreatedAt());
    }

    /**
     * Formulation lisible d'un événement.
     *
     * Calculée ici plutôt que dans le front : c'est le vocabulaire métier de la
     * plateforme, et il doit rester identique partout où la frise s'affiche.
     */
    private static String libelle(TypeEvenementLivraison type) {
        return switch (type) {
            case PAIEMENT_CONFIRME -> "Paiement confirmé";
            case CODE_GENERE -> "Code de remise créé";
            case CODE_ENVOYE -> "Code transmis à l'acheteur";
            case ANIMAL_PRET -> "Animal prêt à être remis";
            case PRIS_EN_CHARGE -> "Pris en charge pour livraison";
            case POSITION -> "Position mise à jour";
            case CODE_REFUSE -> "Code incorrect saisi";
            case CODE_VALIDE -> "Remise confirmée par code";
            case ECHEC_LIVRAISON -> "Remise non aboutie";
            case LITIGE_OUVERT -> "Litige ouvert";
            case LITIGE_ARBITRE -> "Litige arbitré";
            case FONDS_LIBERES -> "Fonds débloqués pour le vendeur";
        };
    }
}
