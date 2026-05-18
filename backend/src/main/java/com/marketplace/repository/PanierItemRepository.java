package com.marketplace.repository;

import com.marketplace.model.PanierItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PanierItemRepository extends JpaRepository<PanierItem, Long> {

    List<PanierItem> findByPanierId(Long panierId);

    Optional<PanierItem> findByPanierIdAndAnimalId(Long panierId, UUID animalId);

    void deleteByPanierIdAndAnimalId(Long panierId, UUID animalId);

    boolean existsByPanierIdAndAnimalId(Long panierId, UUID animalId);

    List<PanierItem> findByVendeurId(Long vendeurId);
}