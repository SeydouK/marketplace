package com.marketplace.dto;

import com.marketplace.model.HistoryEventType;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class AnimalHistoryEventDTO {
    private UUID id;
    private HistoryEventType eventType;
    private String description;
    private Long actorId;
    private String actorName;
    private Double longitude;
    private Double latitude;
    private Instant eventDate;
    private String blockchainHash;
}
