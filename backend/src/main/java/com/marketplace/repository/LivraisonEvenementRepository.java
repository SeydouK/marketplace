package com.marketplace.repository;

import com.marketplace.model.LivraisonEvenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface LivraisonEvenementRepository extends JpaRepository<LivraisonEvenement, Long> {

    /** Frise d'un animal, du plus ancien au plus recent. */
    List<LivraisonEvenement> findByCommandeItemIdOrderByCreatedAtAsc(Long commandeItemId);

    /**
     * Frises de plusieurs animaux en une requete — evite le N+1 quand on affiche
     * une commande entiere ou la liste des ventes.
     */
    List<LivraisonEvenement> findByCommandeItemIdInOrderByCreatedAtAsc(Collection<Long> commandeItemIds);
}
