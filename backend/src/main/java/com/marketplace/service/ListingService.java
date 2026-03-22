package com.marketplace.service;

import com.marketplace.dto.ListingDTO;
import com.marketplace.dto.SearchFilterDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Listing;
import com.marketplace.model.ListingStatus;
import com.marketplace.model.Role;
import com.marketplace.model.User;
import com.marketplace.repository.ListingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.JoinType;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ListingService(ListingRepository listingRepository, UserService userService, ModelMapper modelMapper) {
        this.listingRepository = listingRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public ListingDTO createListing(ListingDTO dto) {
        User current = userService.getCurrentUser();
        Listing listing = modelMapper.map(dto, Listing.class);
        listing.setUser(current);
        listing.setTitle(dto.getTitle().trim());
        listing.setDescription(trimToNull(dto.getDescription()));
        listing.setAnimalType(normalizeAnimalType(dto.getAnimalType()));
        listing.setLocation(normalizeLocation(dto.getLocation()));
        listing.setSellerName(StringUtils.hasText(dto.getSellerName()) ? dto.getSellerName().trim() : current.getName());
        listing.setSellerPhone(dto.getSellerPhone().trim());
        listing.setImage(trimToNull(dto.getImage()));
        listing.setStatus(dto.getStatus() == null ? ListingStatus.DISPONIBLE : dto.getStatus());
        listing.setBreed(trimToNull(dto.getBreed()));
        return toDto(listingRepository.save(listing));
    }

    @Transactional
    public ListingDTO updateListing(Long id, ListingDTO dto) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annonce introuvable"));
        User current = userService.getCurrentUser();
        if (!listing.getUser().getId().equals(current.getId()) && current.getRole() != Role.ADMIN) {
            throw new BadRequestException("Non autorise");
        }
        listing.setTitle(dto.getTitle().trim());
        listing.setDescription(trimToNull(dto.getDescription()));
        listing.setAnimalType(normalizeAnimalType(dto.getAnimalType()));
        listing.setPrice(dto.getPrice());
        listing.setLocation(normalizeLocation(dto.getLocation()));
        listing.setSellerName(StringUtils.hasText(dto.getSellerName()) ? dto.getSellerName().trim() : current.getName());
        listing.setSellerPhone(dto.getSellerPhone().trim());
        listing.setImage(trimToNull(dto.getImage()));
        listing.setRating(dto.getRating());
        listing.setAgeMonths(dto.getAgeMonths());
        listing.setBreed(trimToNull(dto.getBreed()));
        listing.setStatus(dto.getStatus() == null ? ListingStatus.DISPONIBLE : dto.getStatus());
        return toDto(listingRepository.save(listing));
    }

    @Transactional
    public void deleteListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annonce introuvable"));
        User current = userService.getCurrentUser();
        if (!listing.getUser().getId().equals(current.getId()) && current.getRole() != Role.ADMIN) {
            throw new BadRequestException("Non autorise");
        }
        listingRepository.delete(listing);
    }

    @Transactional(readOnly = true)
    public ListingDTO getListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Annonce introuvable"));
        return toDto(listing);
    }

    @Transactional(readOnly = true)
    public List<ListingDTO> getMyListings() {
        return listingRepository.findByUserOrderByCreatedAtDesc(userService.getCurrentUser())
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ListingDTO> listPublic(SearchFilterDTO filter) {
        SearchFilterDTO effectiveFilter = filter == null ? new SearchFilterDTO() : filter;
        Specification<Listing> specification = buildSpecification(effectiveFilter);
        return listingRepository.findAll(specification, Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toDto)
                .toList();
    }

    private Specification<Listing> buildSpecification(SearchFilterDTO filter) {
        return (root, query, cb) -> {
            if (query != null && query.getResultType() != Long.class) {
                root.fetch("user", JoinType.LEFT);
                query.distinct(true);
            }

            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(filter.getLocation())) {
                List<jakarta.persistence.criteria.Predicate> locationPredicates = buildLocationPredicates(filter.getLocation(), root, cb);
                predicates.add(cb.or(locationPredicates.toArray(new jakarta.persistence.criteria.Predicate[0])));
            }
            if (StringUtils.hasText(filter.getAnimalType())) {
                predicates.add(cb.equal(cb.lower(root.get("animalType")), normalizeAnimalType(filter.getAnimalType())));
            }
            if (filter.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), filter.getStatus()));
            }
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }
            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }

    private String normalizeAnimalType(String animalType) {
        return animalType == null ? null : animalType.trim().toLowerCase(Locale.ROOT);
    }

    private List<jakarta.persistence.criteria.Predicate> buildLocationPredicates(
            String location,
            jakarta.persistence.criteria.Root<Listing> root,
            jakarta.persistence.criteria.CriteriaBuilder cb
    ) {
        Set<String> searchTerms = new LinkedHashSet<>();
        String trimmed = location.trim();
        searchTerms.add(trimmed.toLowerCase(Locale.ROOT));
        searchTerms.add(normalizeLocation(trimmed).toLowerCase(Locale.ROOT));

        return searchTerms.stream()
                .filter(StringUtils::hasText)
                .map(term -> cb.like(cb.lower(root.get("location")), "%" + term + "%"))
                .toList();
    }

    private String normalizeLocation(String location) {
        if (location == null) {
            return null;
        }

        String trimmed = location.trim();
        if (trimmed.isEmpty()) {
            return trimmed;
        }

        String simplified = stripAccents(trimmed).toLowerCase(Locale.ROOT);
        return switch (simplified) {
            case "abidjan" -> "Abidjan";
            case "bouake" -> "Bouak\u00E9";
            case "korhogo" -> "Korhogo";
            case "ferkessedougou" -> "Ferkess\u00E9dougou";
            case "yamoussoukro" -> "Yamoussoukro";
            default -> trimmed;
        };
    }

    private String stripAccents(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }

        return value.trim();
    }

    private ListingDTO toDto(Listing listing) {
        ListingDTO dto = new ListingDTO();
        dto.setId(listing.getId());
        dto.setTitle(listing.getTitle());
        dto.setDescription(listing.getDescription());
        dto.setAnimalType(listing.getAnimalType());
        dto.setPrice(listing.getPrice());
        dto.setLocation(listing.getLocation());
        dto.setSellerName(listing.getSellerName());
        dto.setSellerPhone(listing.getSellerPhone());
        dto.setImage(listing.getImage());
        dto.setRating(listing.getRating());
        dto.setAgeMonths(listing.getAgeMonths());
        dto.setBreed(listing.getBreed());
        dto.setStatus(listing.getStatus());
        dto.setUserId(listing.getUser().getId());
        dto.setOwnerName(listing.getUser().getName());
        return dto;
    }
}
