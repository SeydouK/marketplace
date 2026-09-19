package com.marketplace.service;

import com.marketplace.dto.ActualiteDTO;
import com.marketplace.dto.ActualiteRequest;
import com.marketplace.dto.ActualiteResumeDTO;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Actualite;
import com.marketplace.repository.ActualiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Redaction et diffusion des actualites.
 *
 * Aucun controle de role ici : les deux surfaces sont separees par leurs URL
 * — {@code /api/actualites} est ouvert en lecture, {@code /api/admin/actualites}
 * est ferme par la chaine de securite. Melanger les deux dans un meme service
 * garde-fou reviendrait a dupliquer une regle deja tenue ailleurs.
 */
@Service
@RequiredArgsConstructor
public class ActualiteService {

    private final ActualiteRepository actualiteRepository;

    // ── Lecture publique ─────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ActualiteResumeDTO> listerPubliees() {
        return actualiteRepository
                .findByPublieeTrueAndDatePublicationLessThanEqualOrderByDatePublicationDesc(LocalDateTime.now())
                .stream()
                .map(this::versResume)
                .toList();
    }

    @Transactional(readOnly = true)
    public ActualiteDTO lirePubliee(Long id) {
        Actualite actualite = actualiteRepository.findByIdAndPublieeTrue(id)
                .filter(a -> !a.getDatePublication().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new ResourceNotFoundException("Actualite introuvable."));
        return versDTO(actualite);
    }

    /**
     * Date du dernier article en ligne, ou {@code null} s'il n'y en a aucun.
     *
     * L'en-tete compare cette date a celle de la derniere visite pour decider
     * d'afficher sa pastille. Une seule valeur suffit : la pastille dit qu'il y
     * a du neuf, pas combien.
     */
    @Transactional(readOnly = true)
    public LocalDateTime dernierePublication() {
        return actualiteRepository.findDerniereDatePublication(LocalDateTime.now()).orElse(null);
    }

    // ── Administration ───────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ActualiteDTO> listerTout() {
        return actualiteRepository.findAllByOrderByDatePublicationDesc()
                .stream()
                .map(this::versDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ActualiteDTO lire(Long id) {
        return versDTO(trouver(id));
    }

    @Transactional
    public ActualiteDTO creer(ActualiteRequest request, Long redigeParId) {
        Actualite actualite = new Actualite();
        appliquer(actualite, request);
        actualite.setRedigeParId(redigeParId);
        return versDTO(actualiteRepository.save(actualite));
    }

    @Transactional
    public ActualiteDTO modifier(Long id, ActualiteRequest request) {
        Actualite actualite = trouver(id);
        appliquer(actualite, request);
        return versDTO(actualiteRepository.save(actualite));
    }

    /**
     * Bascule en ligne / hors ligne sans repasser par le formulaire.
     *
     * Retirer un article publie par erreur doit tenir en un geste : demander
     * de rouvrir l'editeur pour decocher une case, c'est ajouter des minutes
     * la ou une information fausse est deja visible.
     */
    @Transactional
    public ActualiteDTO changerPublication(Long id, boolean publiee) {
        Actualite actualite = trouver(id);
        actualite.setPubliee(publiee);
        return versDTO(actualiteRepository.save(actualite));
    }

    @Transactional
    public void supprimer(Long id) {
        actualiteRepository.delete(trouver(id));
    }

    // ── Interne ──────────────────────────────────────────────────────────────

    private Actualite trouver(Long id) {
        return actualiteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Actualite introuvable."));
    }

    private void appliquer(Actualite actualite, ActualiteRequest request) {
        actualite.setTitre(request.getTitre().trim());
        actualite.setResume(request.getResume().trim());
        actualite.setContenu(request.getContenu());
        actualite.setCategorie(request.getCategorie());
        actualite.setImageUrl(vide(request.getImageUrl()) ? null : request.getImageUrl().trim());
        actualite.setAuteur(request.getAuteur().trim());
        actualite.setDatePublication(
                request.getDatePublication() != null ? request.getDatePublication() : LocalDateTime.now());
        actualite.setPubliee(Boolean.TRUE.equals(request.getPubliee()));
    }

    private boolean vide(String valeur) {
        return valeur == null || valeur.isBlank();
    }

    private ActualiteResumeDTO versResume(Actualite a) {
        return new ActualiteResumeDTO(
                a.getId(), a.getTitre(), a.getResume(), a.getCategorie(),
                a.getImageUrl(), a.getAuteur(), a.getDatePublication());
    }

    private ActualiteDTO versDTO(Actualite a) {
        return new ActualiteDTO(
                a.getId(), a.getTitre(), a.getResume(), a.getContenu(), a.getCategorie(),
                a.getImageUrl(), a.getAuteur(), a.getDatePublication(), a.isPubliee(), a.getUpdatedAt());
    }
}
