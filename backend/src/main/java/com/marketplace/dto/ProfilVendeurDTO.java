package com.marketplace.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data
@Builder
public class ProfilVendeurDTO {
    private Long id;
    private String name;
    private String avatarUrl;
    private Instant dateInscription;
    private int nombreAnnonces;
    // email et phone volontairement absents
}
