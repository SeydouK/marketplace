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

    Page<Animal> findByStatus(AnimalStatus status, Pageable pageable);

    long countByStatus(AnimalStatus status);

    // ── Dashboard ANADER ──────────────────────────────────────────────────────

    /**
     * Animaux DISPONIBLE sans puce RFID, avec filtre optionnel par région.
     * Ce sont les animaux que l'agent ANADER doit aller équiper.
     */
    @Query("""
        SELECT a FROM Animal a
        LEFT JOIN FETCH a.owner
        WHERE a.status = 'DISPONIBLE'
          AND a.rfidTag IS NULL
          AND (:region IS NULL OR UPPER(a.region) = UPPER(:region))
        ORDER BY a.createdAt ASC
        """)
    Page<Animal> findDisponibleSansRfid(
        @Param("region") String region,
        Pageable pageable
    );

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

    /** Nombre d'animaux DISPONIBLE sans RFID (tous agents confondus) */
    long countByStatusAndRfidTagIsNull(AnimalStatus status);
}