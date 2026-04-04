package com.marketplace.repository;

import com.marketplace.model.AnimalSeller;
import com.marketplace.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalSellerRepository extends JpaRepository<AnimalSeller, UUID> {

    @EntityGraph(attributePaths = "animal")
    List<AnimalSeller> findBySellerOrderByAssociationDateDesc(User seller);

    @EntityGraph(attributePaths = "seller")
    Optional<AnimalSeller> findByAnimalId(UUID animalId);

    long countBySeller(User seller);
}
