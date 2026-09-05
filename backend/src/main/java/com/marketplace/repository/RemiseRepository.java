package com.marketplace.repository;

import com.marketplace.model.Remise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RemiseRepository extends JpaRepository<Remise, Long> {

    Optional<Remise> findByCommandeIdAndVendeurId(Long commandeId, Long vendeurId);

    List<Remise> findByCommandeId(Long commandeId);

    List<Remise> findByVendeurId(Long vendeurId);

    Optional<Remise> findByConvoyageJeton(String convoyageJeton);

    List<Remise> findByTransporteurId(Long transporteurId);
}
