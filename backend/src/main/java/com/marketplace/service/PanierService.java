package com.marketplace.service;

import com.marketplace.dto.PanierDTO;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Animal;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Panier;
import com.marketplace.model.PanierItem;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.PanierItemRepository;
import com.marketplace.repository.PanierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PanierService {

    private final PanierRepository panierRepository;
    private final PanierItemRepository panierItemRepository;
    private final AnimalRepository animalRepository;

    public Panier getOuCreerPanier(Long userId) {
        return panierRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Panier nouveau = new Panier();
                    nouveau.setUserId(userId);
                    return panierRepository.save(nouveau);
                });
    }

    @Transactional(readOnly = true)
    public PanierDTO getPanier(Long userId) {
        return toDTO(getOuCreerPanier(userId));
    }

    public PanierDTO ajouterArticle(Long userId, UUID animalId, int quantite) {
        Panier panier = getOuCreerPanier(userId);

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new ResourceNotFoundException("Animal introuvable : " + animalId));

        if (animal.getStatus() != AnimalStatus.DISPONIBLE) {
            throw new IllegalStateException("Cet animal n'est pas disponible à la vente.");
        }

        if (animal.getOwner() != null && animal.getOwner().getId().equals(userId)) {
            throw new IllegalStateException("Vous ne pouvez pas acheter votre propre animal.");
        }

        panierItemRepository.findByPanierIdAndAnimalId(panier.getId(), animalId)
                .ifPresentOrElse(
                        item -> item.setQuantite(item.getQuantite() + quantite),
                        () -> panierItemRepository.save(buildItem(panier, animal, quantite))
                );

        return toDTO(panierRepository.findById(panier.getId()).orElseThrow());
    }

    public PanierDTO modifierQuantite(Long userId, Long itemId, int nouvelleQuantite) {
        Panier panier = getOuCreerPanier(userId);
        PanierItem item = panierItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable : " + itemId));

        if (!item.getPanier().getId().equals(panier.getId()))
            throw new IllegalStateException("Cet article n'appartient pas à votre panier.");

        if (nouvelleQuantite <= 0) panierItemRepository.delete(item);
        else item.setQuantite(nouvelleQuantite);

        return toDTO(panierRepository.findById(panier.getId()).orElseThrow());
    }

    public PanierDTO supprimerArticle(Long userId, Long itemId) {
        Panier panier = getOuCreerPanier(userId);
        PanierItem item = panierItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable : " + itemId));

        if (!item.getPanier().getId().equals(panier.getId()))
            throw new IllegalStateException("Cet article n'appartient pas à votre panier.");

        panierItemRepository.delete(item);
        return toDTO(panierRepository.findById(panier.getId()).orElseThrow());
    }

    public void viderPanier(Long userId) {
        Panier panier = getOuCreerPanier(userId);
        panier.getItems().clear();
        panierRepository.save(panier);
    }

    @Transactional(readOnly = true)
    public int getNombreArticles(Long userId) {
        return panierRepository.countItemsByUserId(userId);
    }

    private PanierItem buildItem(Panier panier, Animal animal, int quantite) {
        PanierItem item = new PanierItem();
        item.setPanier(panier);
        item.setAnimalId(animal.getId());

        String nom = animal.getRace() != null && !animal.getRace().isBlank()
                ? animal.getRace() : animal.getType().name();
        item.setAnimalNom(nom);
        item.setAnimalRace(animal.getRace());

        // Animal.price est BigDecimal — affectation directe, compatible avec columnDefinition="numeric"
        item.setPrixUnitaire(animal.getPrice());
        item.setQuantite(quantite);

        if (animal.getOwner() != null) {
            item.setVendeurId(animal.getOwner().getId());
            item.setVendeurNom((animal.getOwner().getSurname() + " " + animal.getOwner().getName()).trim());
        }

        if (animal.getPhotos() != null && animal.getPhotos().length > 0)
            item.setPhotoUrl(animal.getPhotos()[0]);

        item.setLocalisation(buildLocalisation(animal.getVille(), animal.getRegion()));
        return item;
    }

    private String buildLocalisation(String ville, String region) {
        if (ville != null && region != null) return ville + ", " + region;
        if (ville != null) return ville;
        if (region != null) return region;
        return null;
    }

    private PanierDTO toDTO(Panier panier) {
        List<PanierDTO.PanierItemDTO> items = panier.getItems().stream()
                .map(this::toItemDTO).collect(Collectors.toList());
        return new PanierDTO(panier.getId(), panier.getUserId(), items,
                panier.getTotal(), panier.getNombreArticles(), panier.getUpdatedAt());
    }

    private PanierDTO.PanierItemDTO toItemDTO(PanierItem item) {
        return new PanierDTO.PanierItemDTO(
                item.getId(), item.getAnimalId(),
                item.getAnimalNom(), item.getAnimalRace(),
                item.getPrixUnitaire(), item.getQuantite(), item.getSousTotal(),
                item.getVendeurId(), item.getVendeurNom(),
                item.getPhotoUrl(), item.getLocalisation(), item.getAddedAt());
    }
}