package com.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Un point du parcours, conserve pour tracer la route reellement empruntee.
 *
 * Distinct de la position courante portee par {@link Remise} : celle-ci repond a
 * « ou est-il maintenant ? », celle-la a « par ou est-il passe ? ». La premiere
 * s'ecrase, la seconde s'accumule — d'ou deux stockages separes.
 */
@Entity
@Table(name = "livraison_positions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LivraisonPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "remise_id", nullable = false)
    private Long remiseId;

    @Column(name = "latitude", nullable = false)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false)
    private BigDecimal longitude;

    /** Precision GPS annoncee, en metres. */
    @Column(name = "precision_m")
    private Integer precisionM;

    /** Vitesse instantanee, en km/h. Nulle quand le materiel ne la fournit pas. */
    @Column(name = "vitesse_kmh")
    private BigDecimal vitesseKmh;

    /** Direction du deplacement, en degres depuis le nord. Nulle a l'arret. */
    @Column(name = "cap_degres")
    private BigDecimal capDegres;

    @Column(name = "enregistre_le")
    private LocalDateTime enregistreLe;

    @PrePersist
    protected void onCreate() {
        enregistreLe = LocalDateTime.now();
    }
}
