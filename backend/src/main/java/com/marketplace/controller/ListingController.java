package com.marketplace.controller;

import com.marketplace.dto.ListingDTO;
import com.marketplace.dto.SearchFilterDTO;
import com.marketplace.model.ListingStatus;
import com.marketplace.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping
    public ResponseEntity<ListingDTO> create(@Valid @RequestBody ListingDTO dto) {
        return ResponseEntity.ok(listingService.createListing(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListingDTO> update(@PathVariable Long id, @Valid @RequestBody ListingDTO dto) {
        return ResponseEntity.ok(listingService.updateListing(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListing(id));
    }

    @GetMapping
    public ResponseEntity<List<ListingDTO>> list(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String animalType,
            @RequestParam(required = false) ListingStatus status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        SearchFilterDTO filter = new SearchFilterDTO();
        filter.setLocation(location);
        filter.setAnimalType(animalType);
        filter.setStatus(status);
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);
        return ResponseEntity.ok(listingService.listPublic(filter));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ListingDTO>> search(@RequestBody(required = false) SearchFilterDTO filter) {
        return ResponseEntity.ok(listingService.listPublic(filter));
    }
}
