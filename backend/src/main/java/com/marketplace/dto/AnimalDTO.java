package com.marketplace.dto;

import com.marketplace.model.AnimalStatus;
import com.marketplace.model.AnimalType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class AnimalDTO {
    private UUID id;
    private String qrCode;
    private AnimalType type;
    private String race;
    private String lieuNaissance;
    private BigDecimal price;
    private List<String> photos = new ArrayList<>();
    private List<String> videos = new ArrayList<>();
    private Integer quantity;
    private BigDecimal animalPoids;
    private Double longitude;
    private Double latitude;
    private AnimalStatus status;
    private Instant createdAt;
    private Instant updatedAt;
    private Long sellerId;
    private String sellerName;
    private String sellerEmail;
    private String displayName;
    private boolean groupedLot;
    private List<AnimalHealthRecordDTO> healthRecords = new ArrayList<>();
    private List<AnimalHistoryEventDTO> history = new ArrayList<>();
}
