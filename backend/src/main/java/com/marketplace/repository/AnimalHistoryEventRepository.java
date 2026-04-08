package com.marketplace.repository;

import com.marketplace.model.AnimalHistoryEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnimalHistoryEventRepository extends JpaRepository<AnimalHistoryEvent, UUID> {
    List<AnimalHistoryEvent> findByAnimalIdOrderByEventDateDesc(UUID animalId);
}
