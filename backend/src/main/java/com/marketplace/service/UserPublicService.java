package com.marketplace.service;

import com.marketplace.dto.AnimalDTO;
import com.marketplace.dto.ProfilVendeurDTO;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPublicService {

    private final UserRepository userRepository;
    private final AnimalService animalService;

    @Transactional(readOnly = true)
    public ProfilVendeurDTO getProfilPublic(Long vendeurId) {
        User user = userRepository.findById(vendeurId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendeur introuvable."));

        long nombreAnnonces = animalService.countAnimalsForSeller(user);

        return ProfilVendeurDTO.builder()
            .id(user.getId())
            .name(user.getName() + " " + user.getSurname())
            .avatarUrl(user.getAvatarUrl())
            .dateInscription(user.getCreatedAt())
            .nombreAnnonces((int) nombreAnnonces)
            // email et phone volontairement absents
            .build();
    }

    @Transactional(readOnly = true)
    public List<AnimalDTO> getAnnoncesVendeur(Long vendeurId) {
        User user = userRepository.findById(vendeurId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendeur introuvable."));

        // Réutilise listMyAnimals en passant par le contexte du vendeur
        // On filtre uniquement les annonces DISPONIBLES (vue publique)
        return animalService.listPublic(null)
            .stream()
            .filter(a -> vendeurId.equals(a.getSellerId()))
            .toList();
    }
}
