package com.marketplace.service;

import com.marketplace.dto.TransporteurDossierDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.KycStatus;
import com.marketplace.model.Role;
import com.marketplace.model.TypeVehicule;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Le permis de conduire, second document exigé d'un transporteur.
 *
 * <p>Le KYC existant établit <em>qui</em> est la personne — pièce d'identité et
 * selfie comparé. Le permis établit qu'elle a le droit de conduire. Les deux sont
 * nécessaires : une identité vérifiée ne dit rien de la capacité à prendre la
 * route avec un animal de plusieurs centaines de milliers de francs.
 *
 * <p><strong>La validation est humaine, volontairement.</strong> Le KYC s'appuie
 * sur une reconnaissance automatique ; pour le permis, un administrateur regarde.
 * Un faux positif ici ne coûte pas un compte mal ouvert, mais un animal confié à
 * quelqu'un qui n'aurait pas dû l'être — et c'est la plateforme qui l'aura
 * présenté comme fiable.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PermisService {

    private static final Logger log = LoggerFactory.getLogger(PermisService.class);

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final UserService userService;

    // ══ Côté transporteur ═══════════════════════════════════════════════════

    /** Dépose le permis. Il reste à valider : déposer n'est pas être habilité. */
    public TransporteurDossierDTO deposerPermis(String email, MultipartFile fichier) {
        User transporteur = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable."));

        if (transporteur.getRole() != Role.TRANSPORTEUR) {
            throw new ForbiddenException("Seuls les transporteurs déposent un permis de conduire.");
        }

        transporteur.setPermisUrl(fileStorageService.store(fichier, "SANITARY_DOCUMENT").getUrl());
        // Un nouveau dépôt annule la validation précédente : le document a changé,
        // l'approbation qui portait sur l'ancien n'a plus d'objet.
        transporteur.setPermisValide(false);
        transporteur.setPermisValideAt(null);
        transporteur.setPermisValideParId(null);
        userRepository.save(transporteur);

        log.info("Permis déposé par le transporteur {}.", transporteur.getId());
        return toDossier(transporteur);
    }

    /** Renseigne le véhicule — ce que le vendeur regarde pour choisir. */
    public TransporteurDossierDTO declarerVehicule(String email, TypeVehicule type, Integer capacite) {
        User transporteur = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable."));

        if (transporteur.getRole() != Role.TRANSPORTEUR) {
            throw new ForbiddenException("Réservé aux transporteurs.");
        }
        if (capacite != null && capacite <= 0) {
            throw new BadRequestException("La capacité doit être supérieure à zéro.");
        }

        transporteur.setTypeVehicule(type);
        transporteur.setCapaciteTetes(capacite);
        userRepository.save(transporteur);
        return toDossier(transporteur);
    }

    @Transactional(readOnly = true)
    public TransporteurDossierDTO monDossier(String email) {
        return toDossier(userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable.")));
    }

    // ══ Côté administrateur ═════════════════════════════════════════════════

    /** Les dossiers qui attendent un regard : permis déposé, pas encore tranché. */
    @Transactional(readOnly = true)
    public List<TransporteurDossierDTO> dossiersEnAttente() {
        ensureAdmin();
        return userRepository.findByRole(Role.TRANSPORTEUR).stream()
                .filter(t -> t.getPermisUrl() != null && !t.isPermisValide())
                .map(this::toDossier)
                .toList();
    }

    public TransporteurDossierDTO valider(Long transporteurId) {
        User admin = ensureAdmin();
        User transporteur = chargerTransporteur(transporteurId);

        if (transporteur.getPermisUrl() == null) {
            throw new BadRequestException("Ce transporteur n'a pas encore déposé de permis.");
        }

        transporteur.setPermisValide(true);
        transporteur.setPermisValideAt(LocalDateTime.now());
        transporteur.setPermisValideParId(admin.getId());
        userRepository.save(transporteur);

        log.info("Permis du transporteur {} validé par l'admin {}.", transporteurId, admin.getId());
        return toDossier(transporteur);
    }

    /** Refuse le permis. Le transporteur peut en redéposer un. */
    public TransporteurDossierDTO refuser(Long transporteurId, String motif) {
        User admin = ensureAdmin();
        User transporteur = chargerTransporteur(transporteurId);

        transporteur.setPermisValide(false);
        transporteur.setPermisValideAt(null);
        transporteur.setPermisValideParId(null);
        userRepository.save(transporteur);

        log.info("Permis du transporteur {} refusé par l'admin {} — {}",
                transporteurId, admin.getId(), motif);
        return toDossier(transporteur);
    }

    // ══ Interne ═════════════════════════════════════════════════════════════

    private User chargerTransporteur(Long id) {
        User utilisateur = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transporteur introuvable."));
        if (utilisateur.getRole() != Role.TRANSPORTEUR) {
            throw new BadRequestException("Cet utilisateur n'est pas un transporteur.");
        }
        return utilisateur;
    }

    private User ensureAdmin() {
        User utilisateur = userService.getCurrentUser();
        if (utilisateur.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Cette action est reservee aux administrateurs.");
        }
        return utilisateur;
    }

    /**
     * Le dossier tel qu'il s'affiche.
     *
     * {@code habilite} résume la seule question qui compte pour un vendeur : ce
     * transporteur peut-il recevoir une course ? La calculer ici évite que chaque
     * écran refasse la règle à sa façon.
     */
    private TransporteurDossierDTO toDossier(User t) {
        boolean identiteOk = t.getKycStatus() == KycStatus.VALIDATED;
        return new TransporteurDossierDTO(
                t.getId(),
                (t.getSurname() + " " + t.getName()).trim(),
                t.getEmail(),
                t.getPhone(),
                t.getKycStatus(),
                t.getPermisUrl(),
                t.isPermisValide(),
                t.getPermisValideAt(),
                t.getTypeVehicule(),
                t.getCapaciteTetes(),
                identiteOk && t.isPermisValide(),
                prochaineEtape(t, identiteOk)
        );
    }

    /** Dit au transporteur ce qui lui manque, plutôt que de le laisser deviner. */
    private String prochaineEtape(User t, boolean identiteOk) {
        if (t.getPhone() == null || t.getPhone().isBlank()) {
            return "Renseignez votre numéro de téléphone.";
        }
        if (!identiteOk) {
            return "Vérifiez votre identité : pièce d'identité puis selfie.";
        }
        if (t.getPermisUrl() == null) {
            return "Déposez votre permis de conduire.";
        }
        if (!t.isPermisValide()) {
            return "Votre permis est en cours d'examen par notre équipe.";
        }
        if (t.getTypeVehicule() == null) {
            return "Indiquez votre véhicule pour que les vendeurs vous trouvent.";
        }
        return null;
    }
}
