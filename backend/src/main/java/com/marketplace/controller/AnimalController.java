package com.marketplace.controller;

import com.marketplace.dto.AnimalCreateRequest;
import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.AnimalSearchFilterDTO;
import com.marketplace.dto.AnimalValidationRequest;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.AnimalType;
import com.marketplace.model.HealthDocumentType;
import com.marketplace.service.AnimalService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnimalDTO> create(@Valid @RequestBody AnimalCreateRequest request) {
        return ResponseEntity.ok(animalService.createAnimal(request));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnimalDTO> createMultipart(
            @Valid @RequestPart("payload") AnimalCreateRequest request,
            @RequestPart(name = "photoFiles", required = false) List<MultipartFile> photoFiles,
            @RequestPart(name = "videoFiles", required = false) List<MultipartFile> videoFiles,
            @RequestPart(name = "documentFiles", required = false) List<MultipartFile> documentFiles,
            @RequestParam(name = "documentTypes", required = false) List<HealthDocumentType> documentTypes
    ) {
        return ResponseEntity.ok(animalService.createAnimal(request, photoFiles, videoFiles, documentFiles, documentTypes));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnimalDTO> update(@PathVariable UUID id, @Valid @RequestBody AnimalCreateRequest request) {
        return ResponseEntity.ok(animalService.updateAnimal(id, request));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnimalDTO> updateMultipart(
            @PathVariable UUID id,
            @Valid @RequestPart("payload") AnimalCreateRequest request,
            @RequestPart(name = "photoFiles", required = false) List<MultipartFile> photoFiles,
            @RequestPart(name = "videoFiles", required = false) List<MultipartFile> videoFiles,
            @RequestPart(name = "documentFiles", required = false) List<MultipartFile> documentFiles,
            @RequestParam(name = "documentTypes", required = false) List<HealthDocumentType> documentTypes
    ) {
        return ResponseEntity.ok(animalService.updateAnimal(id, request, photoFiles, videoFiles, documentFiles, documentTypes));
    }

    @GetMapping
    public ResponseEntity<List<AnimalDTO>> list(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) AnimalType type,
            @RequestParam(required = false) AnimalStatus status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        AnimalSearchFilterDTO filter = new AnimalSearchFilterDTO();
        filter.setLocation(location);
        filter.setType(type);
        filter.setStatus(status);
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);
        return ResponseEntity.ok(animalService.listPublic(filter));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<AnimalDTO>> mine() {
        return ResponseEntity.ok(animalService.listMyAnimals());
    }

    @GetMapping("/validation/pending")
    public ResponseEntity<List<AnimalDTO>> pendingValidations() {
        return ResponseEntity.ok(animalService.listPendingValidations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalDTO> get(@PathVariable UUID id) {
        return ResponseEntity.ok(animalService.getAnimal(id));
    }

    @PostMapping("/{id}/validation")
    public ResponseEntity<AnimalDTO> validate(@PathVariable UUID id, @Valid @RequestBody AnimalValidationRequest request) {
        return ResponseEntity.ok(animalService.validateAnimal(id, request));
    }
}
