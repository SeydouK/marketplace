package com.marketplace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "reference", unique = true)
    private String reference;

    @Column(name = "checkout_url", columnDefinition = "text")
    private String checkoutUrl;

    @Column(name = "montant", nullable = false, columnDefinition = "numeric")
    private BigDecimal montant;

    /** Frais preleves par GeniusPay (1% + 100 XOF), snapshot au moment de la creation de la commande. */
    @Column(name = "frais_geniuspay", nullable = false, columnDefinition = "numeric")
    private BigDecimal fraisGeniusPay;

    /** Commission de la plateforme (3% du montant), snapshot au moment de la creation de la commande. */
    @Column(name = "commission_plateforme", nullable = false, columnDefinition = "numeric")
    private BigDecimal commissionPlateforme;

    /** Montant reellement du au vendeur = montant - fraisGeniusPay - commissionPlateforme. */
    @Column(name = "montant_net_vendeur", nullable = false, columnDefinition = "numeric")
    private BigDecimal montantNetVendeur;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutCommande statut = StatutCommande.EN_ATTENTE;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CommandeItem> items = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    /**
     * Quand on a decouvert que l'operateur avait encaisse une commande que nous
     * avions abandonnee.
     *
     * Une date plutot qu'un booleen : savoir QUAND la contradiction a ete vue
     * compte autant que de savoir qu'elle existe, et c'est ce qui permet au
     * balayage de ne pas re-signaler indefiniment le meme cas.
     */
    @Column(name = "paiement_orphelin_detecte_at")
    private LocalDateTime paiementOrphelinDetecteAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
