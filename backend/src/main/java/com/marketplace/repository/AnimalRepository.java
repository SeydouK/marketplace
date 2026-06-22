package com.marketplace.repository;

import com.marketplace.model.Animal;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {

    // ── Dashboard vendeur ─────────────────────────────────────────────────────

    long countByOwner(User owner);
    long countByOwnerAndStatus(User owner, AnimalStatus status);

    // ── Requêtes par statut (services vendeur / véto) ─────────────────────────

    List<Animal> findByStatusOrderByCreatedAtDesc(AnimalStatus status);

    List<Animal> findByStatusInOrderByCreatedAtDesc(List<AnimalStatus> statuses);

    Page<Animal> findByStatus(AnimalStatus status, Pageable pageable);

    long countByStatus(AnimalStatus status);

    // ── Dashboard ANADER ──────────────────────────────────────────────────────

    /**
     * Animaux sans puce RFID (tous statuts sauf VENDU), filtre optionnel par région.
     *
     * CAST(region AS string) évite l'erreur PostgreSQL "function upper(bytea) does not exist"
     * causée par le binding JDBC du paramètre nullable :region en bytea.
     */
    @Query(
        value = """
            SELECT a FROM Animal a
            LEFT JOIN FETCH a.owner
            WHERE a.status <> :vendu
              AND a.rfidTag IS NULL
              AND (:region IS NULL OR UPPER(CAST(a.region AS string)) = UPPER(CAST(:region AS string)))
            ORDER BY a.createdAt ASC
            """,
        countQuery = """
            SELECT COUNT(a) FROM Animal a
            WHERE a.status <> :vendu
              AND a.rfidTag IS NULL
              AND (:region IS NULL OR UPPER(CAST(a.region AS string)) = UPPER(CAST(:region AS string)))
            """
    )
    Page<Animal> findSansRfid(
        @Param("vendu")  AnimalStatus vendu,
        @Param("region") String region,
        Pageable pageable
    );

    /**
     * Comptage cohérent avec findSansRfid.
     */
    @Query("""
        SELECT COUNT(a) FROM Animal a
        WHERE a.status <> :vendu
          AND a.rfidTag IS NULL
        """)
    long countSansRfidHorsVendu(@Param("vendu") AnimalStatus vendu);

    /** Nombre total de puces insérées par un agent donné */
    long countByRfidInsertedBy(User agent);

    /** Nombre de puces insérées par un agent sur un mois donné */
    @Query("""
        SELECT COUNT(a) FROM Animal a
        WHERE a.rfidInsertedBy = :agent
          AND a.rfidInsertedAt >= :debutMois
          AND a.rfidInsertedAt < :finMois
        """)
    long countRfidInseresCeMois(
        @Param("agent")     User agent,
        @Param("debutMois") Instant debutMois,
        @Param("finMois")   Instant finMois
    );

    long countByStatusAndRfidTagIsNull(AnimalStatus status);
}