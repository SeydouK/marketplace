package com.marketplace.repository;

import com.marketplace.model.LivraisonPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivraisonPositionRepository extends JpaRepository<LivraisonPosition, Long> {

    /** Le trace d'une course, du depart jusqu'au dernier point. */
    List<LivraisonPosition> findByRemiseIdOrderByEnregistreLeAsc(Long remiseId);

    long countByRemiseId(Long remiseId);
}
