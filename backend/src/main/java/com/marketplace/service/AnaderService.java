package com.marketplace.service;

import com.marketplace.dto.AnaderStatsResponse;
import com.marketplace.dto.AnimalSansRfidResponse;
import com.marketplace.dto.AnimalSansRfidResponse.OwnerSummary;
import com.marketplace.dto.RfidInsertionRequest;
import com.marketplace.model.Animal;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.TemporalAdjusters;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnaderService {

    private final AnimalRepository animalRepository;
    private final UserRepository   userRepository;

    private static final BigDecimal REMUNERATION_PAR_RFID = BigDecimal.valueOf(500);

    // ── Récupère l'agent connecté et vérifie son rôle ─────────────────────────
    private User currentAgent() {
        String email = SecurityContextHolder.getContext()
                           .getAuthentication().getName();
        User agent = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Utilisateur introuvable"));

        if (agent.getRole() != Role.ANADER) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Accès réservé aux agents ANADER");
        }
        return agent;
    }

    // ── Stats ─────────────────────────────────────────────────────────────────
    @Transactional(readOnly = true)
    public AnaderStatsResponse getStats() {
        User agent = currentAgent();

        Instant now        = Instant.now();
        Instant debutMois  = now.atZone(ZoneOffset.UTC)
                               .with(TemporalAdjusters.firstDayOfMonth())
                               .toLocalDate().atStartOfDay(ZoneOffset.UTC).toInstant();
        Instant finMois    = now.atZone(ZoneOffset.UTC)
                               .with(TemporalAdjusters.firstDayOfNextMonth())
                               .toLocalDate().atStartOfDay(ZoneOffset.UTC).toInstant();

        long total    = animalRepository.countByRfidInsertedBy(agent);
        long mois     = animalRepository.countRfidInseresCeMois(agent, debutMois, finMois);
        long sansPuce = animalRepository.countSansRfidHorsVendu(AnimalStatus.VENDU);

        return new AnaderStatsResponse(
            mois,
            total,
            sansPuce,
            REMUNERATION_PAR_RFID.multiply(BigDecimal.valueOf(total))
        );
    }

    // ── Liste animaux DISPONIBLE sans RFID ───────────────────────────────────
    @Transactional(readOnly = true)
    public Page<AnimalSansRfidResponse> getAnimauxSansRfid(String region, Pageable pageable) {
        currentAgent(); // vérification rôle

        // region null = toutes régions
        String regionFilter = (region != null && !region.isBlank()) ? region.trim() : null;

        return animalRepository
            .findSansRfid(AnimalStatus.VENDU, regionFilter, pageable)
            .map(this::toResponse);
    }

    // ── Insertion RFID ────────────────────────────────────────────────────────
    @Transactional
    public AnimalSansRfidResponse insererRfid(UUID animalId, RfidInsertionRequest request) {
        User agent = currentAgent();

        Animal animal = animalRepository.findById(animalId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Animal introuvable"));

        // Vérifications métier
        if (animal.getRfidTag() != null) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Cet animal possède déjà une puce RFID : " + animal.getRfidTag());
        }
        if (animal.getStatus() != AnimalStatus.DISPONIBLE) {
            throw new ResponseStatusException(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "La puce RFID ne peut être insérée que sur un animal avec statut DISPONIBLE " +
                "(fiche validée par vétérinaire). Statut actuel : " + animal.getStatus());
        }

        // Enregistrement
        animal.setRfidTag(request.rfidTag().trim().toUpperCase());
        animal.setRfidInsertedAt(Instant.now());
        animal.setRfidInsertedBy(agent);

        return toResponse(animalRepository.save(animal));
    }

    // ── Mapping Animal → DTO ──────────────────────────────────────────────────
    private AnimalSansRfidResponse toResponse(Animal a) {
        AnimalSansRfidResponse.OwnerSummary owner = null;
        if (a.getOwner() != null) {
            owner = new AnimalSansRfidResponse.OwnerSummary(
                a.getOwner().getId(),
                a.getOwner().getName(),
                a.getOwner().getPhone()  // ⚠️ Ajouter getPhone() à User si absent
            );
        }
        return new AnimalSansRfidResponse(
            a.getId(),
            a.getQrCode(),
            a.getType(),
            a.getRace(),
            a.getRegion(),
            a.getVille(),
            a.getLatitude(),
            a.getLongitude(),
            a.getPhotos(),
            owner,
            a.getCreatedAt()
        );
    }
}