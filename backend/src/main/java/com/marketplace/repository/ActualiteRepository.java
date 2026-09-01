package com.marketplace.repository;

import com.marketplace.model.Actualite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActualiteRepository extends JpaRepository<Actualite, Long> {

    /**
     * Ce que voit le public.
     *
     * La borne sur la date, en plus du drapeau, autorise la programmation : un
     * article marque publie mais date de demain n'apparait que demain, sans
     * qu'un administrateur ait a se connecter le jour dit.
     */
    List<Actualite> findByPublieeTrueAndDatePublicationLessThanEqualOrderByDatePublicationDesc(
            LocalDateTime maintenant);

    Optional<Actualite> findByIdAndPublieeTrue(Long id);

    /** Alimente la pastille « NOUVEAU » sans transporter le corps des articles. */
    @Query("SELECT MAX(a.datePublication) FROM Actualite a "
            + "WHERE a.publiee = true AND a.datePublication <= :maintenant")
    Optional<LocalDateTime> findDerniereDatePublication(LocalDateTime maintenant);

    List<Actualite> findAllByOrderByDatePublicationDesc();
}
