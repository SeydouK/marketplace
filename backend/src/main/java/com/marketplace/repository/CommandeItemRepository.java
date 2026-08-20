package com.marketplace.repository;

import com.marketplace.model.CommandeItem;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutLivraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommandeItemRepository extends JpaRepository<CommandeItem, Long> {

    /**
     * Ventes d'un vendeur : uniquement les articles de commandes reellement payees.
     * Une commande EN_ATTENTE n'est pas une vente — l'afficher laisserait croire a un
     * revenu qui peut encore expirer.
     */
    @Query("SELECT i FROM CommandeItem i JOIN FETCH i.commande c "
            + "WHERE i.vendeurId = :vendeurId AND c.statut = :statut "
            + "ORDER BY c.paidAt DESC")
    List<CommandeItem> findVentesPayees(@Param("vendeurId") Long vendeurId,
                                        @Param("statut") StatutCommande statut);

    List<CommandeItem> findByCommandeIdAndVendeurId(Long commandeId, Long vendeurId);

    @Query("SELECT i FROM CommandeItem i JOIN FETCH i.commande WHERE i.id = :id")
    Optional<CommandeItem> findByIdWithCommande(@Param("id") Long id);

    /**
     * Articles livres depuis assez longtemps sans que l'acheteur se manifeste.
     * Sert au balayage qui libere les versements par delai.
     */
    List<CommandeItem> findByStatutLivraisonAndLivreAtBefore(StatutLivraison statut, LocalDateTime seuil);
}
