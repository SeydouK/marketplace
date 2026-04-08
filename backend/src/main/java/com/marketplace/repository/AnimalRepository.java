package com.marketplace.repository;

import com.marketplace.model.Animal;
import com.marketplace.model.AnimalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {
    List<Animal> findAllByOrderByCreatedAtDesc();
    List<Animal> findByStatusOrderByCreatedAtDesc(AnimalStatus status);
    long countByStatus(AnimalStatus status);
}
