package com.marketplace.repository;

import com.marketplace.model.Remboursement;
import com.marketplace.model.StatutRemboursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RemboursementRepository extends JpaRepository<Remboursement, Long> {

    List<Remboursement> findByCommandeId(Long commandeId);

    List<Remboursement> findAllByOrderByCreatedAtDesc();

    List<Remboursement> findByStatutOrderByCreatedAtDesc(StatutRemboursement statut);

    List<Remboursement> findByAcheteurIdOrderByCreatedAtDesc(Long acheteurId);
}
