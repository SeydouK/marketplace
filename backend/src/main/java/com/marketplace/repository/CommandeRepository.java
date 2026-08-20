package com.marketplace.repository;

import com.marketplace.model.Commande;
import com.marketplace.model.StatutCommande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {

    Optional<Commande> findByReference(String reference);

    Optional<Commande> findByIdAndUserId(Long id, Long userId);

    Page<Commande> findByStatut(StatutCommande statut, Pageable pageable);

    /** Commandes non encore payees d'un acheteur — sert a ne pas en creer une seconde pour le meme panier. */
    List<Commande> findByUserIdAndStatut(Long userId, StatutCommande statut);

    /** Commandes restees en attente au-dela du delai : leur reservation d'animaux doit etre relachee. */
    List<Commande> findByStatutAndCreatedAtBefore(StatutCommande statut, LocalDateTime seuil);

    /**
     * Transition atomique EN_ATTENTE -> PAYEE, deleguee a la base.
     *
     * Le webhook GeniusPay et la reconciliation declenchee par le polling du front peuvent
     * arriver simultanement : un simple "if (statut == PAYEE) return" ne protege pas, les deux
     * transactions pouvant lire EN_ATTENTE avant que l'une n'ecrive. Comme genererVersements()
     * cree des lignes sans garde-fou, un doublon se traduirait par un vendeur paye deux fois.
     *
     * Pas de clearAutomatically : Commande.items est LAZY et doit rester attache pour la suite.
     *
     * @return 1 si cet appel a opere la transition, 0 si un autre l'avait deja faite.
     */
    @Modifying(flushAutomatically = true)
    @Query("UPDATE Commande c SET c.statut = :payee, c.paidAt = :paidAt "
            + "WHERE c.id = :id AND c.statut = :enAttente")
    int marquerPayeeSiEnAttente(@Param("id") Long id,
                                @Param("enAttente") StatutCommande enAttente,
                                @Param("payee") StatutCommande payee,
                                @Param("paidAt") LocalDateTime paidAt);
}
