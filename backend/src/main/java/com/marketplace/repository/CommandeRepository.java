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

    /**
     * Historique complet d'un acheteur pour « Mes achats ».
     * Les items sont charges dans la meme requete : ils sont LAZY et
     * spring.jpa.open-in-view=false ferme la session avant la serialisation.
     */
    @Query("SELECT DISTINCT c FROM Commande c LEFT JOIN FETCH c.items "
            + "WHERE c.userId = :userId ORDER BY c.createdAt DESC")
    List<Commande> findMesCommandesAvecItems(@Param("userId") Long userId);

    /** Commandes non encore payees d'un acheteur — sert a ne pas en creer une seconde pour le meme panier. */
    List<Commande> findByUserIdAndStatut(Long userId, StatutCommande statut);

    /** Commandes restees en attente au-dela du delai : leur reservation d'animaux doit etre relachee. */
    List<Commande> findByStatutAndCreatedAtBefore(StatutCommande statut, LocalDateTime seuil);

    /**
     * Les commandes abandonnees recemment, qui portaient un lien de paiement.
     *
     * Sert au filet de rattrapage : une commande annulee ou expiree de notre cote
     * a pu etre payee juste apres, et plus rien ne la regarde une fois qu'elle a
     * quitte EN_ATTENTE. Sans cette requete, l'argent partirait sans laisser de
     * trace exploitable.
     */
    List<Commande> findByStatutInAndReferenceIsNotNullAndCreatedAtAfter(
            List<StatutCommande> statuts, LocalDateTime depuis);

    /** Les contradictions constatees entre notre statut et celui de l'operateur. */
    Page<Commande> findByPaiementOrphelinDetecteAtIsNotNull(Pageable pageable);

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
