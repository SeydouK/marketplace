package com.marketplace.service;

import com.marketplace.dto.AnimalCreateRequest;
import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.AnimalHealthDocumentInput;
import com.marketplace.dto.AnimalHealthRecordDTO;
import com.marketplace.dto.AnimalHistoryEventDTO;
import com.marketplace.dto.AnimalSearchFilterDTO;
import com.marketplace.dto.AnimalStatsDTO;
import com.marketplace.dto.AnimalValidationRequest;
import com.marketplace.dto.AdminListingDTO;
import com.marketplace.dto.AdminListingPageDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Animal;
import com.marketplace.model.AnimalHealthRecord;
import com.marketplace.model.AnimalHistoryEvent;
import com.marketplace.model.AnimalSeller;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.AnimalType;
import com.marketplace.model.HealthValidationStatus;
import com.marketplace.model.HealthDocumentType;
import com.marketplace.model.HistoryEventType;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.AnimalHealthRecordRepository;
import com.marketplace.repository.AnimalHistoryEventRepository;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.AnimalSellerRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
public class AnimalService {

    private static final DateTimeFormatter QR_DATE_FORMAT =
            DateTimeFormatter.ofPattern("yyyyMMddHHmmss").withZone(ZoneOffset.UTC);

    private final AnimalRepository animalRepository;
    private final AnimalSellerRepository animalSellerRepository;
    private final AnimalHealthRecordRepository animalHealthRecordRepository;
    private final AnimalHistoryEventRepository animalHistoryEventRepository;
    private final UserService userService;
    private final FileStorageService fileStorageService;

    public AnimalService(
            AnimalRepository animalRepository,
            AnimalSellerRepository animalSellerRepository,
            AnimalHealthRecordRepository animalHealthRecordRepository,
            AnimalHistoryEventRepository animalHistoryEventRepository,
            UserService userService,
            FileStorageService fileStorageService
    ) {
        this.animalRepository = animalRepository;
        this.animalSellerRepository = animalSellerRepository;
        this.animalHealthRecordRepository = animalHealthRecordRepository;
        this.animalHistoryEventRepository = animalHistoryEventRepository;
        this.userService = userService;
        this.fileStorageService = fileStorageService;
    }

    // ── Création ─────────────────────────────────────────────────────────────

    @Transactional
    public AnimalDTO createAnimal(AnimalCreateRequest request) {
        return createAnimal(request, List.of(), List.of(), List.of(), List.of());
    }

    @Transactional
    public AnimalDTO createAnimal(
            AnimalCreateRequest request,
            List<MultipartFile> photoFiles,
            List<MultipartFile> videoFiles,
            List<MultipartFile> documentFiles,
            List<HealthDocumentType> uploadedDocumentTypes
    ) {
        User currentUser = userService.getCurrentUser();
        ensureSellerRole(currentUser);

        PreparedAnimalFiles preparedFiles = prepareAnimalFiles(
                request, photoFiles, videoFiles, documentFiles, uploadedDocumentTypes);
        registerFileLifecycle(preparedFiles.newlyStoredFiles(), List.of());

        // Statut initial : EN_ATTENTE — en attente de validation vétérinaire
        Animal animal = Animal.builder()
                .qrCode(generateQrCode())
                .status(AnimalStatus.EN_ATTENTE)
                .build();

        applyAnimalRequest(animal, request, preparedFiles.photos(), preparedFiles.videos());
        Animal savedAnimal = animalRepository.save(animal);

        animalSellerRepository.save(AnimalSeller.builder()
                .animal(savedAnimal)
                .seller(currentUser)
                .associationDate(Instant.now())
                .build());

        replaceHealthDocuments(savedAnimal, preparedFiles.healthDocuments());

        saveHistoryEvent(
                savedAnimal, currentUser,
                HistoryEventType.ENREGISTREMENT,
                buildRegistrationDescription(savedAnimal),
                request.getLongitude(), request.getLatitude());

        return toDto(savedAnimal);
    }

    // ── Mise à jour ──────────────────────────────────────────────────────────

    @Transactional
    public AnimalDTO updateAnimal(UUID animalId, AnimalCreateRequest request) {
        return updateAnimal(animalId, request, List.of(), List.of(), List.of(), List.of());
    }

    @Transactional
    public AnimalDTO updateAnimal(
            UUID animalId,
            AnimalCreateRequest request,
            List<MultipartFile> photoFiles,
            List<MultipartFile> videoFiles,
            List<MultipartFile> documentFiles,
            List<HealthDocumentType> uploadedDocumentTypes
    ) {
        User currentUser = userService.getCurrentUser();
        ensureSellerRole(currentUser);

        Animal animal = findAnimal(animalId);
        AnimalSeller animalSeller = animalSellerRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Association vendeur introuvable pour cet animal."));
        ensureOwner(currentUser, animalSeller);

        List<String> previousPhotos = toList(animal.getPhotos());
        List<String> previousVideos = toList(animal.getVideos());
        List<String> previousDocumentUrls = animalHealthRecordRepository
                .findByAnimalIdOrderByUploadedAtDesc(animal.getId())
                .stream()
                .map(AnimalHealthRecord::getDocumentUrl)
                .toList();

        PreparedAnimalFiles preparedFiles = prepareAnimalFiles(
                request, photoFiles, videoFiles, documentFiles, uploadedDocumentTypes);
        registerFileLifecycle(
                preparedFiles.newlyStoredFiles(),
                findObsoleteFiles(previousPhotos, previousVideos, previousDocumentUrls, preparedFiles));

        // Toute modification remet l'animal en EN_ATTENTE pour revalidation
        AnimalStatus previousStatus = animal.getStatus();
        applyAnimalRequest(animal, request, preparedFiles.photos(), preparedFiles.videos());
        animal.setStatus(AnimalStatus.EN_ATTENTE);
        Animal savedAnimal = animalRepository.save(animal);
        replaceHealthDocuments(savedAnimal, preparedFiles.healthDocuments());

        saveHistoryEvent(
                savedAnimal, currentUser,
                HistoryEventType.EDITION,
                buildEditionDescription(savedAnimal),
                request.getLongitude(), request.getLatitude());

        if (previousStatus != AnimalStatus.EN_ATTENTE) {
            saveHistoryEvent(
                    savedAnimal, currentUser,
                    HistoryEventType.CHANGEMENT_STATUT,
                    "Dossier modifié — repassé en EN_ATTENTE pour revalidation vétérinaire.",
                    request.getLongitude(), request.getLatitude());
        }

        return toDto(savedAnimal, animalSeller);
    }

    // ── Lecture publique ─────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<AnimalDTO> listPublic(AnimalSearchFilterDTO filter) {
        AnimalSearchFilterDTO effectiveFilter = filter == null ? new AnimalSearchFilterDTO() : filter;
        if (effectiveFilter.getStatus() != null && effectiveFilter.getStatus() != AnimalStatus.DISPONIBLE) {
            return List.of();
        }

        return animalRepository.findByStatusOrderByCreatedAtDesc(AnimalStatus.DISPONIBLE)
                .stream()
                .filter(animal -> matchesFilter(animal, effectiveFilter))
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AnimalDTO getAnimal(UUID id) {
        Animal animal = findAnimal(id);
        AnimalSeller animalSeller = animalSellerRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Association vendeur introuvable pour cet animal."));

        if (animal.getStatus() != AnimalStatus.DISPONIBLE
                && userService.getCurrentUserIfAuthenticated()
                        .filter(user -> canViewUnpublishedAnimal(user, animalSeller))
                        .isEmpty()) {
            throw new ResourceNotFoundException("Animal introuvable.");
        }

        return toDto(animal, animalSeller);
    }

    // ── Mes animaux (vendeur) ────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<AnimalDTO> listMyAnimals() {
        User currentUser = userService.getCurrentUser();
        return animalSellerRepository.findBySellerOrderByAssociationDateDesc(currentUser)
                .stream()
                .map(AnimalSeller::getAnimal)
                .distinct()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AnimalStatsDTO getMyAnimalStats() {
        User currentUser = userService.getCurrentUser();
        List<Animal> animals = animalSellerRepository.findBySellerOrderByAssociationDateDesc(currentUser)
                .stream()
                .map(AnimalSeller::getAnimal)
                .distinct()
                .toList();

        long available   = animals.stream().filter(a -> a.getStatus() == AnimalStatus.DISPONIBLE).count();
        long unavailable = animals.stream().filter(a -> a.getStatus() == AnimalStatus.INDISPONIBLE).count();
        long pending     = animals.stream().filter(a -> a.getStatus() == AnimalStatus.EN_ATTENTE).count();

        return new AnimalStatsDTO((long) animals.size(), available, unavailable, pending);
    }

    // ── Toggle statut vendeur (DISPONIBLE ↔ INDISPONIBLE) ───────────────────

    @Transactional
    public AnimalDTO toggleSellerStatus(UUID animalId, AnimalStatus newStatus) {
        User currentUser = userService.getCurrentUser();

        Animal animal = findAnimal(animalId);
        AnimalSeller animalSeller = animalSellerRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Association vendeur introuvable."));
        ensureOwner(currentUser, animalSeller);

        // Seul un animal déjà validé (DISPONIBLE ou INDISPONIBLE) peut être togglé
        if (animal.getStatus() != AnimalStatus.DISPONIBLE
                && animal.getStatus() != AnimalStatus.INDISPONIBLE) {
            throw new ForbiddenException("Seules les annonces validées peuvent être activées ou désactivées.");
        }

        // Le vendeur ne peut passer qu'entre DISPONIBLE et INDISPONIBLE
        if (newStatus != AnimalStatus.DISPONIBLE && newStatus != AnimalStatus.INDISPONIBLE) {
            throw new ForbiddenException("Statut non autorisé pour cette action.");
        }

        AnimalStatus previousStatus = animal.getStatus();
        if (previousStatus != newStatus) {
            animal.setStatus(newStatus);
            animalRepository.save(animal);
            saveHistoryEvent(
                    animal, currentUser,
                    HistoryEventType.CHANGEMENT_STATUT,
                    "Statut modifié par le vendeur : " + previousStatus + " → " + newStatus + ".",
                    null, null);
        }

        return toDto(animal, animalSeller);
    }

    // ── Validation vétérinaire ───────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<AnimalDTO> listPendingValidations() {
        User currentUser = userService.getCurrentUser();
        ensureHealthAgentRole(currentUser);

        // Retourne EN_ATTENTE + INDISPONIBLE (rejetés pouvant être revalidés)
        return animalRepository.findByStatusInOrderByCreatedAtDesc(
                        List.of(AnimalStatus.EN_ATTENTE, AnimalStatus.INDISPONIBLE))
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public AnimalDTO validateAnimal(UUID animalId, AnimalValidationRequest request) {
        User currentUser = userService.getCurrentUser();
        ensureHealthAgentRole(currentUser);

        Animal animal = findAnimal(animalId);
        AnimalHealthRecord healthRecord = resolveHealthRecord(animal, request);
        healthRecord.setValidationStatus(request.getValidationStatus());
        healthRecord.setValidatedBy(currentUser);
        healthRecord.setValidatedAt(Instant.now());
        animalHealthRecordRepository.save(healthRecord);

        AnimalStatus previousStatus = animal.getStatus();
        AnimalStatus targetStatus = request.getValidationStatus() == HealthValidationStatus.VALIDE
                ? AnimalStatus.DISPONIBLE
                : AnimalStatus.INDISPONIBLE;

        animal.setStatus(targetStatus);
        animalRepository.save(animal);

        saveHistoryEvent(
                animal, currentUser,
                HistoryEventType.VISITE_VETERINAIRE,
                request.getVisitResult().trim(),
                request.getLongitude(), request.getLatitude());

        if (previousStatus != targetStatus) {
            saveHistoryEvent(
                    animal, currentUser,
                    HistoryEventType.CHANGEMENT_STATUT,
                    "Statut passe de " + previousStatus + " a " + targetStatus + ".",
                    request.getLongitude(), request.getLatitude());
        }

        return toDto(animal);
    }

    // ── Administration ───────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public AdminListingPageDTO listAdminListings(AnimalStatus status, int page, int size) {
        ensureAdminRole(userService.getCurrentUser());

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 100);
        Pageable pageable = PageRequest.of(safePage, safeSize,
                Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<Animal> animals = status == null
                ? animalRepository.findAll(pageable)
                : animalRepository.findByStatus(status, pageable);

        return new AdminListingPageDTO(
                animals.getContent().stream().map(this::toAdminListingDto).toList(),
                animals.getTotalElements(),
                animals.getTotalPages(),
                animals.getNumber());
    }

    @Transactional
    public AdminListingDTO publishAdminListing(UUID animalId) {
        User currentUser = userService.getCurrentUser();
        ensureAdminRole(currentUser);
        return updateAdminListingStatus(findAnimal(animalId), AnimalStatus.DISPONIBLE, currentUser);
    }

    @Transactional
    public AdminListingDTO suspendAdminListing(UUID animalId) {
        User currentUser = userService.getCurrentUser();
        ensureAdminRole(currentUser);
        return updateAdminListingStatus(findAnimal(animalId), AnimalStatus.INDISPONIBLE, currentUser);
    }

    // ── Comptages ────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public long countAnimalsForSeller(User seller) {
        return animalSellerRepository.countBySeller(seller);
    }

    @Transactional(readOnly = true)
    public long countPendingValidations() {
        return animalRepository.countByStatus(AnimalStatus.EN_ATTENTE)
             + animalRepository.countByStatus(AnimalStatus.INDISPONIBLE);
    }

    // ── Privé : statut admin ─────────────────────────────────────────────────

    private AdminListingDTO updateAdminListingStatus(Animal animal, AnimalStatus targetStatus, User actor) {
        AnimalStatus previousStatus = animal.getStatus();
        if (previousStatus != targetStatus) {
            animal.setStatus(targetStatus);
            animalRepository.save(animal);
            saveHistoryEvent(
                    animal, actor,
                    HistoryEventType.CHANGEMENT_STATUT,
                    "Statut modere par administrateur : " + previousStatus + " -> " + targetStatus + ".",
                    null, null);
        }
        return toAdminListingDto(animal);
    }

    // ── Privé : résolution fiche sanitaire ───────────────────────────────────

    private AnimalHealthRecord resolveHealthRecord(Animal animal, AnimalValidationRequest request) {
        if (request.getHealthRecordId() != null) {
            return animalHealthRecordRepository
                    .findByIdAndAnimalId(request.getHealthRecordId(), animal.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Fiche sanitaire introuvable pour cet animal."));
        }

        if (!StringUtils.hasText(request.getDocumentUrl()) || request.getDocumentType() == null) {
            throw new BadRequestException("Selectionnez une fiche existante ou televersez un nouveau document.");
        }

        return animalHealthRecordRepository.save(AnimalHealthRecord.builder()
                .animal(animal)
                .documentUrl(request.getDocumentUrl().trim())
                .documentType(request.getDocumentType())
                .validationStatus(HealthValidationStatus.EN_ATTENTE)
                .uploadedAt(Instant.now())
                .build());
    }

    // ── Privé : récupération ─────────────────────────────────────────────────

    private Animal findAnimal(UUID id) {
        return animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal introuvable."));
    }

    // ── Privé : application des champs ───────────────────────────────────────

    private void applyAnimalRequest(
            Animal animal,
            AnimalCreateRequest request,
            List<String> photoUrls,
            List<String> videoUrls
    ) {
        animal.setType(request.getType());
        animal.setRace(trimToNull(request.getRace()));
        animal.setBirthLocation(trimToNull(request.getLieuNaissance()));
        animal.setPrice(request.getPrice());
        animal.setPhotos(toArray(photoUrls));
        animal.setVideos(toArray(videoUrls));
        animal.setQuantity(request.getQuantity());
        animal.setLongitude(request.getLongitude());
        animal.setLatitude(request.getLatitude());
    }

    // ── Privé : filtrage ─────────────────────────────────────────────────────

    private boolean matchesFilter(Animal animal, AnimalSearchFilterDTO filter) {
        if (filter.getType() != null && animal.getType() != filter.getType()) return false;
        if (StringUtils.hasText(filter.getLocation())
                && !normalizeText(animal.getBirthLocation()).contains(normalizeText(filter.getLocation())))
            return false;
        if (filter.getMinPrice() != null && isLowerThan(animal.getPrice(), filter.getMinPrice())) return false;
        if (filter.getMaxPrice() != null && isGreaterThan(animal.getPrice(), filter.getMaxPrice())) return false;
        return true;
    }

    // ── Privé : mappage DTO ──────────────────────────────────────────────────

    private AnimalDTO toDto(Animal animal) {
        AnimalSeller animalSeller = animalSellerRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Association vendeur introuvable pour cet animal."));
        return toDto(animal, animalSeller);
    }

    private AnimalDTO toDto(Animal animal, AnimalSeller animalSeller) {
        AnimalDTO dto = new AnimalDTO();
        dto.setId(animal.getId());
        dto.setQrCode(animal.getQrCode());
        dto.setType(animal.getType());
        dto.setRace(animal.getRace());
        dto.setLieuNaissance(animal.getBirthLocation());
        dto.setPrice(animal.getPrice());
        dto.setPhotos(toList(animal.getPhotos()));
        dto.setVideos(toList(animal.getVideos()));
        dto.setQuantity(animal.getQuantity());
        dto.setLongitude(animal.getLongitude());
        dto.setLatitude(animal.getLatitude());
        dto.setStatus(animal.getStatus());
        dto.setCreatedAt(animal.getCreatedAt());
        dto.setUpdatedAt(animal.getUpdatedAt());
        dto.setSellerId(animalSeller.getSeller().getId());
        dto.setSellerName(animalSeller.getSeller().getName());
        dto.setSellerEmail(animalSeller.getSeller().getEmail());
        dto.setDisplayName(buildDisplayName(animal));
        dto.setGroupedLot(animal.getQuantity() != null && animal.getQuantity() > 10);
        dto.setHealthRecords(animalHealthRecordRepository
                .findByAnimalIdOrderByUploadedAtDesc(animal.getId())
                .stream()
                .map(this::toHealthRecordDto)
                .toList());
        dto.setHistory(animalHistoryEventRepository
                .findByAnimalIdOrderByEventDateDesc(animal.getId())
                .stream()
                .sorted(Comparator.comparing(AnimalHistoryEvent::getEventDate).reversed())
                .map(this::toHistoryDto)
                .toList());
        return dto;
    }

    private AdminListingDTO toAdminListingDto(Animal animal) {
        AnimalSeller animalSeller = animalSellerRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Association vendeur introuvable pour cet animal."));
        User seller = animalSeller.getSeller();
        return new AdminListingDTO(
                animal.getId(),
                buildDisplayName(animal),
                animal.getType(),
                animal.getRace(),
                animal.getBirthLocation(),
                animal.getPrice(),
                animal.getQuantity(),
                animal.getStatus(),
                toList(animal.getPhotos()),
                seller.getId(),
                seller.getName(),
                seller.getEmail(),
                animal.getCreatedAt(),
                animal.getUpdatedAt());
    }

    private AnimalHealthRecordDTO toHealthRecordDto(AnimalHealthRecord record) {
        AnimalHealthRecordDTO dto = new AnimalHealthRecordDTO();
        dto.setId(record.getId());
        dto.setDocumentUrl(record.getDocumentUrl());
        dto.setDocumentType(record.getDocumentType());
        dto.setValidationStatus(record.getValidationStatus());
        dto.setValidatedById(record.getValidatedBy() != null ? record.getValidatedBy().getId() : null);
        dto.setValidatedByName(record.getValidatedBy() != null ? record.getValidatedBy().getName() : null);
        dto.setUploadedAt(record.getUploadedAt());
        dto.setValidatedAt(record.getValidatedAt());
        return dto;
    }

    private AnimalHistoryEventDTO toHistoryDto(AnimalHistoryEvent event) {
        AnimalHistoryEventDTO dto = new AnimalHistoryEventDTO();
        dto.setId(event.getId());
        dto.setEventType(event.getEventType());
        dto.setDescription(event.getDescription());
        dto.setActorId(event.getActor().getId());
        dto.setActorName(event.getActor().getName());
        dto.setLongitude(event.getLongitude());
        dto.setLatitude(event.getLatitude());
        dto.setEventDate(event.getEventDate());
        dto.setBlockchainHash(event.getBlockchainHash());
        return dto;
    }

    // ── Privé : autorisations ────────────────────────────────────────────────

    private boolean canViewUnpublishedAnimal(User user, AnimalSeller animalSeller) {
        return animalSeller.getSeller().getId().equals(user.getId())
                || EnumSet.of(Role.ANADER, Role.VETERINAIRE, Role.ADMIN)
                        .contains(user.getRole());
    }

    private void ensureSellerRole(User user) {
        if (!EnumSet.of(Role.ACHETEUR, Role.VENDEUR, Role.ADMIN).contains(user.getRole())) {
            throw new ForbiddenException("Seuls les vendeurs vérifiés peuvent enregistrer des animaux.");
        }
    }

    private void ensureOwner(User user, AnimalSeller animalSeller) {
        if (!animalSeller.getSeller().getId().equals(user.getId())) {
            throw new ForbiddenException("Seul le propriétaire de ce dossier peut le modifier.");
        }
    }

    private void ensureHealthAgentRole(User user) {
        if (!EnumSet.of(Role.VETERINAIRE).contains(user.getRole())) {
            throw new ForbiddenException("Cette action est réservée à un vétérinaire.");
        }
    }

    private void ensureAdminRole(User user) {
        if (!EnumSet.of(Role.ADMIN).contains(user.getRole())) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
    }

    // ── Privé : historique ───────────────────────────────────────────────────

    private void saveHistoryEvent(
            Animal animal,
            User actor,
            HistoryEventType eventType,
            String description,
            Double longitude,
            Double latitude
    ) {
        animalHistoryEventRepository.save(AnimalHistoryEvent.builder()
                .animal(animal)
                .actor(actor)
                .eventType(eventType)
                .description(trimToNull(description))
                .longitude(longitude)
                .latitude(latitude)
                .eventDate(Instant.now())
                .build());
    }

    // ── Privé : utilitaires ──────────────────────────────────────────────────

    private String generateQrCode() {
        return "BTL-" + QR_DATE_FORMAT.format(Instant.now()) + "-"
                + UUID.randomUUID().toString().substring(0, 8).toUpperCase(Locale.ROOT);
    }

    private String buildRegistrationDescription(Animal animal) {
        String lotHint = animal.getQuantity() != null && animal.getQuantity() > 10 ? " (lot regroupé)" : "";
        String location = StringUtils.hasText(animal.getBirthLocation())
                ? " à " + animal.getBirthLocation() : "";
        return formatAnimalType(animal.getType()) + lotHint
                + " enregistré avec le QR " + animal.getQrCode() + location + ".";
    }

    private String buildEditionDescription(Animal animal) {
        return "Dossier mis à jour par le propriétaire pour " + buildDisplayName(animal) + ".";
    }

    private String buildDisplayName(Animal animal) {
        if (StringUtils.hasText(animal.getRace())) {
            return formatAnimalType(animal.getType()) + " " + animal.getRace();
        }
        return formatAnimalType(animal.getType()) + " " + animal.getQrCode();
    }

    private String formatAnimalType(AnimalType animalType) {
        if (animalType == null) return "Animal";
        return switch (animalType) {
            case BOVIN   -> "Bovin";
            case OVIN    -> "Ovin";
            case CAPRIN  -> "Caprin";
            case PORCIN  -> "Porcin";
            case AVICOLE -> "Volaille";
            case AUTRE   -> "Animal";
        };
    }

    private boolean isLowerThan(BigDecimal value, BigDecimal reference) {
        return value != null && value.compareTo(reference) < 0;
    }

    private boolean isGreaterThan(BigDecimal value, BigDecimal reference) {
        return value != null && value.compareTo(reference) > 0;
    }

    private String trimToNull(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }

    private String normalizeText(String value) {
        return StringUtils.hasText(value) ? value.trim().toLowerCase(Locale.ROOT) : "";
    }

    // ── Privé : documents sanitaires ────────────────────────────────────────

    private void replaceHealthDocuments(Animal animal, List<AnimalHealthDocumentInput> documents) {
        animalHealthRecordRepository.deleteByAnimalId(animal.getId());
        for (AnimalHealthDocumentInput document : documents) {
            animalHealthRecordRepository.save(AnimalHealthRecord.builder()
                    .animal(animal)
                    .documentUrl(document.getDocumentUrl().trim())
                    .documentType(document.getDocumentType())
                    .validationStatus(HealthValidationStatus.EN_ATTENTE)
                    .uploadedAt(Instant.now())
                    .build());
        }
    }

    // ── Privé : gestion des fichiers ─────────────────────────────────────────

    private PreparedAnimalFiles prepareAnimalFiles(
            AnimalCreateRequest request,
            List<MultipartFile> photoFiles,
            List<MultipartFile> videoFiles,
            List<MultipartFile> documentFiles,
            List<HealthDocumentType> uploadedDocumentTypes
    ) {
        List<String> newlyStoredFiles = new ArrayList<>();
        try {
            List<String> storedPhotoUrls = storeFiles(photoFiles, "ANIMAL_PHOTO", newlyStoredFiles);
            List<String> storedVideoUrls = storeFiles(videoFiles, "ANIMAL_VIDEO", newlyStoredFiles);
            List<AnimalHealthDocumentInput> storedHealthDocuments =
                    storeHealthDocuments(documentFiles, uploadedDocumentTypes, newlyStoredFiles);

            return new PreparedAnimalFiles(
                    mergeFileReferences(request.getPhotos(), storedPhotoUrls),
                    mergeFileReferences(request.getVideos(), storedVideoUrls),
                    mergeHealthDocuments(request.getHealthDocuments(), storedHealthDocuments),
                    List.copyOf(newlyStoredFiles));
        } catch (RuntimeException exception) {
            deleteStoredFiles(newlyStoredFiles);
            throw exception;
        }
    }

    private List<String> storeFiles(
            List<MultipartFile> files,
            String categoryKey,
            List<String> newlyStoredFiles
    ) {
        List<String> storedUrls = new ArrayList<>();
        for (MultipartFile file : normalizeFiles(files)) {
            String storedUrl = fileStorageService.store(file, categoryKey).getUrl();
            storedUrls.add(storedUrl);
            newlyStoredFiles.add(storedUrl);
        }
        return storedUrls;
    }

    private List<AnimalHealthDocumentInput> storeHealthDocuments(
            List<MultipartFile> documentFiles,
            List<HealthDocumentType> uploadedDocumentTypes,
            List<String> newlyStoredFiles
    ) {
        List<MultipartFile> files = normalizeFiles(documentFiles);
        List<HealthDocumentType> documentTypes =
                uploadedDocumentTypes == null ? List.of() : uploadedDocumentTypes;

        if (files.size() != documentTypes.size()) {
            throw new BadRequestException("Chaque document sanitaire televerse doit avoir un type associe.");
        }

        List<AnimalHealthDocumentInput> storedDocuments = new ArrayList<>();
        for (int index = 0; index < files.size(); index++) {
            String storedUrl = fileStorageService.store(files.get(index), "SANITARY_DOCUMENT").getUrl();
            newlyStoredFiles.add(storedUrl);

            AnimalHealthDocumentInput document = new AnimalHealthDocumentInput();
            document.setDocumentUrl(storedUrl);
            document.setDocumentType(documentTypes.get(index));
            storedDocuments.add(document);
        }
        return storedDocuments;
    }

    private List<MultipartFile> normalizeFiles(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) return List.of();
        return files.stream().filter(f -> f != null && !f.isEmpty()).toList();
    }

    private List<String> mergeFileReferences(List<String> existingFiles, List<String> newFiles) {
        Set<String> merged = new LinkedHashSet<>();
        if (existingFiles != null)
            existingFiles.stream().filter(StringUtils::hasText).map(String::trim).forEach(merged::add);
        if (newFiles != null)
            newFiles.stream().filter(StringUtils::hasText).map(String::trim).forEach(merged::add);
        return List.copyOf(merged);
    }

    private List<AnimalHealthDocumentInput> mergeHealthDocuments(
            List<AnimalHealthDocumentInput> existingDocuments,
            List<AnimalHealthDocumentInput> newDocuments
    ) {
        List<AnimalHealthDocumentInput> merged = new ArrayList<>();
        if (existingDocuments != null) {
            for (AnimalHealthDocumentInput doc : existingDocuments) {
                if (doc == null || !StringUtils.hasText(doc.getDocumentUrl())
                        || doc.getDocumentType() == null) continue;
                AnimalHealthDocumentInput retained = new AnimalHealthDocumentInput();
                retained.setDocumentUrl(doc.getDocumentUrl().trim());
                retained.setDocumentType(doc.getDocumentType());
                merged.add(retained);
            }
        }
        if (newDocuments != null) merged.addAll(newDocuments);
        return List.copyOf(merged);
    }

    private List<String> findObsoleteFiles(
            List<String> previousPhotos,
            List<String> previousVideos,
            List<String> previousDocumentUrls,
            PreparedAnimalFiles preparedFiles
    ) {
        Set<String> retained = new LinkedHashSet<>();
        retained.addAll(preparedFiles.photos());
        retained.addAll(preparedFiles.videos());
        preparedFiles.healthDocuments().stream()
                .map(AnimalHealthDocumentInput::getDocumentUrl)
                .filter(StringUtils::hasText)
                .forEach(retained::add);

        Set<String> obsolete = new LinkedHashSet<>();
        previousPhotos.stream().filter(StringUtils::hasText).forEach(obsolete::add);
        previousVideos.stream().filter(StringUtils::hasText).forEach(obsolete::add);
        previousDocumentUrls.stream().filter(StringUtils::hasText).forEach(obsolete::add);
        obsolete.removeAll(retained);

        return List.copyOf(obsolete);
    }

    private void registerFileLifecycle(List<String> newlyStoredFiles, List<String> obsoleteFiles) {
        List<String> created = newlyStoredFiles == null
                ? List.of() : List.copyOf(new LinkedHashSet<>(newlyStoredFiles));
        List<String> toDeleteAfterCommit = obsoleteFiles == null
                ? List.of() : List.copyOf(new LinkedHashSet<>(obsoleteFiles));

        if (!TransactionSynchronizationManager.isSynchronizationActive()) {
            deleteStoredFiles(toDeleteAfterCommit);
            return;
        }

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                deleteStoredFiles(toDeleteAfterCommit);
            }

            @Override
            public void afterCompletion(int status) {
                if (status != STATUS_COMMITTED) {
                    deleteStoredFiles(created);
                }
            }
        });
    }

    private void deleteStoredFiles(List<String> fileUrls) {
        if (fileUrls == null || fileUrls.isEmpty()) return;
        for (String url : fileUrls) {
            if (!StringUtils.hasText(url)) continue;
            try {
                fileStorageService.deleteByUrl(url);
            } catch (RuntimeException ignored) {
            }
        }
    }

    private String[] toArray(List<String> values) {
        if (values == null || values.isEmpty()) return new String[0];
        return values.stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .distinct()
                .toArray(String[]::new);
    }

    private List<String> toList(String[] values) {
        if (values == null || values.length == 0) return List.of();
        return List.of(values);
    }

    // ── Record interne ───────────────────────────────────────────────────────

    private record PreparedAnimalFiles(
            List<String> photos,
            List<String> videos,
            List<AnimalHealthDocumentInput> healthDocuments,
            List<String> newlyStoredFiles
    ) {}
}