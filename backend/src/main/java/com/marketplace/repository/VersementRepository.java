package com.marketplace.repository;

import com.marketplace.model.StatutVersement;
import com.marketplace.model.Versement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VersementRepository extends JpaRepository<Versement, Long> {

    Optional<Versement> findByReference(String reference);

    Page<Versement> findByStatut(StatutVersement statut, Pageable pageable);

    List<Versement> findByCommandeId(Long commandeId);

    Optional<Versement> findByCommandeIdAndVendeurId(Long commandeId, Long vendeurId);

    List<Versement> findByVendeurId(Long vendeurId);
}
