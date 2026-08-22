package com.marketplace.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String qrCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private AnimalType type;

    @Column(name = "race")
    private String race;

    @Column(name = "lieu_naissance")
    private String birthLocation;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private String[] photos;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private String[] videos;

    @Column(name = "nombre", nullable = false)
    private Integer quantity = 1;

    /** Poids de l'animal en kilogrammes. */
    @Column(name = "animal_poids", precision = 8, scale = 2)
    private BigDecimal animalPoids;

    private Double longitude;
    private Double latitude;

    /** Région administrative (ex: "PORO", "GBÊKÊ", "ABIDJAN") */
    @Column(name = "region")
    private String region;

    /** Ville / localité (ex: "Korhogo", "Bouaké") */
    @Column(name = "ville")
    private String ville;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private AnimalStatus status = AnimalStatus.INDISPONIBLE;

    // ── Vendeur propriétaire ──────────────────────────────
    /**
     * Propriétaire de l'animal (rôle VENDEUR).
     * FK → users.id (BIGINT, GenerationType.IDENTITY)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    // ── RFID ─────────────────────────────────────────────
    /**
     * Numéro unique de la boucle auriculaire RFID (ISO 11784/11785).
     * Format typique : 15 chiffres, ex: "982000123456789".
     * NULL tant que l'agent ANADER n'a pas encore inséré la puce.
     */
    @Column(name = "rfid_tag", unique = true)
    private String rfidTag;

    /** Horodatage de l'insertion physique de la puce par l'agent ANADER */
    @Column(name = "rfid_inserted_at")
    private Instant rfidInsertedAt;

    /**
     * Agent ANADER qui a confirmé l'insertion.
     * Utilisé pour le calcul de rémunération (500 FCFA / puce).
     * FK → users.id (BIGINT)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rfid_inserted_by", referencedColumnName = "id")
    private User rfidInsertedBy;

    // ── Audit ─────────────────────────────────────────────
    @CreationTimestamp
    @Column(name = "date_creation", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "date_modification", nullable = false)
    private Instant updatedAt;
}