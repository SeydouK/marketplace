package com.marketplace.repository;

import com.marketplace.model.AnimalHealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimalHealthRecordRepository extends JpaRepository<AnimalHealthRecord, UUID> {
    List<AnimalHealthRecord> findByAnimalIdOrderByUploadedAtDesc(UUID animalId);
    Optional<AnimalHealthRecord> findByIdAndAnimalId(UUID id, UUID animalId);
    void deleteByAnimalId(UUID animalId);
}
