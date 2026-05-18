package com.marketplace.repository;

import com.marketplace.model.Panier;
import com.marketplace.model.PanierItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Long> {

    Optional<Panier> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @Query("SELECT COUNT(pi) FROM PanierItem pi WHERE pi.panier.userId = :userId")
    int countItemsByUserId(Long userId);
}
