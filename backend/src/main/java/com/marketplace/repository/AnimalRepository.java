package com.marketplace.repository;

import com.marketplace.model.Animal;
import com.marketplace.model.AnimalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {
    List<Animal> findAllByOrderByCreatedAtDesc();
    List<Animal> findByStatusOrderByCreatedAtDesc(AnimalStatus status);
    Page<Animal> findByStatus(AnimalStatus status, Pageable pageable);
    long countByStatus(AnimalStatus status);
}
