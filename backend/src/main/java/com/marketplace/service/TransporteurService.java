package com.marketplace.service;

import com.marketplace.dto.CourseTransporteurDTO;
import com.marketplace.dto.TransporteurDisponibleDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.KycStatus;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Remise;
import com.marketplace.model.Role;
import com.marketplace.model.StatutAffectation;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.User;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Qui transporte, et pour quelle course.
 *
 * <p>Deux règles gouvernent ce service :
 *
 * <ul>
 *   <li><strong>Une seule course à la fois.</strong> Un transporteur qui a
 *       accepté une livraison disparaît de la liste jusqu'à ce qu'il l'ait
 *       remise.</li>
 *   <li><strong>Le vendeur propose, le transporteur dispose.</strong> Une course
 *       assignée d'office s'enlise sans que personne ne sache si le transporteur
 *       l'a seulement vue.</li>
 * </ul>
 *
 * <p>La disponibilité est <em>déduite</em> des affectations, jamais portée par un
 * indicateur sur l'utilisateur : un drapeau maintenu à la main finit toujours par
 * se désynchroniser, et laisser quelqu'un « occupé » sur une course terminée le
 * prive de travail sans qu'il comprenne pourquoi.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TransporteurService {

    private static final Logger log = LoggerFactory.getLogger(TransporteurService.class);

    /** États dans lesquels une course mobilise encore son transporteur. */
    private static final Set<StatutLivraison> COURSE_EN_COURS = Set.of(
            StatutLivraison.A_REMETTRE,
            StatutLivraison.PRET,
            StatutLivraison.EN_LIVRAISON,
            StatutLivraison.LIVRE,
            StatutLivraison.ECHEC_LIVRAISON);

    private final UserRepository userRepository;
    private final RemiseRepository remiseRepository;
    private final CommandeItemRepository commandeItemRepository;
    private final UserService userService;
    private final NotificationLivraisonService notifications;

    // ══ Côté vendeur ════════════════════════════════════════════════════════

    /**
     * Transporteurs proposables : validés, permis approuvé, et libres.
     *
     * Un transporteur dont le KYC ou le permis n'est pas validé n'apparaît jamais
     * — la plateforme le cautionne en le montrant, elle ne peut pas le faire à la
     * légère.
     */
    @Transactional(readOnly = true)
    public List<TransporteurDisponibleDTO> listerDisponibles() {
        return userRepository.findByRole(Role.TRANSPORTEUR).stream()
                .filter(this::estHabilite)
                .filter(t -> !aUneCourseEnCours(t.getId()))
                .map(t -> new TransporteurDisponibleDTO(
                        t.getId(),
                        (t.getSurname() + " " + t.getName()).trim(),
                        t.getPhone(),
                        t.getTypeVehicule(),
                        t.getCapaciteTetes()))
                .toList();
    }

    /** Propose une course. Le transporteur reste libre tant qu'il n'a pas accepté. */
    public void proposer(Long vendeurId, Long remiseId, Long transporteurId) {
        Remise remise = chargerRemiseDuVendeur(vendeurId, remiseId);

        if (remise.getModeRemise() != ModeRemise.TRANSPORT) {
            throw new BadRequestException(
                    "Cette vente est en retrait sur place : l'acheteur vient chercher l'animal.");
        }
        if (remise.getAffectationStatut() == StatutAffectation.ACCEPTEE) {
            throw new BadRequestException("Un transporteur a déjà pris cette course en charge.");
        }

        User transporteur = userRepository.findById(transporteurId)
                .orElseThrow(() -> new ResourceNotFoundException("Transporteur introuvable."));
        if (!estHabilite(transporteur)) {
            throw new BadRequestException(
                    "Ce transporteur n'est pas encore validé : identité ou permis en attente.");
        }
        if (aUneCourseEnCours(transporteurId)) {
            throw new BadRequestException(
                    "Ce transporteur est déjà sur une livraison. Choisissez-en un autre.");
        }

        remise.setTransporteurId(transporteurId);
        remise.setAffectationStatut(StatutAffectation.PROPOSEE);
        remise.setAffectationAt(LocalDateTime.now());
        remise.setAffectationReponseAt(null);
        remise.setAffectationRefusMotif(null);
        // Le nom et le numero sont figes ici : ils servent a l'affichage, meme si
        // le transporteur modifie son profil plus tard.
        remise.setTransporteurNom((transporteur.getSurname() + " " + transporteur.getName()).trim());
        remise.setTransporteurTelephone(transporteur.getPhone());
        remiseRepository.save(remise);

        // Sans ce message, rien ne previent le transporteur : il lui aurait fallu
        // rouvrir « Mes courses » au hasard pour decouvrir la proposition.
        List<CommandeItem> articles = articles(remise);
        notifications.notifierCourseProposee(transporteurId, remise.getCommandeId(), articles,
                articles.isEmpty() ? null : articles.get(0).getLocalisation(),
                remise.getAdresseVille() != null ? remise.getAdresseVille() : remise.getAdresseLigne());

        log.info("Course {} proposée au transporteur {} par le vendeur {}.",
                remiseId, transporteurId, vendeurId);
    }

    /** Retire une proposition à laquelle personne n'a répondu. */
    public void annulerProposition(Long vendeurId, Long remiseId) {
        Remise remise = chargerRemiseDuVendeur(vendeurId, remiseId);

        if (remise.getAffectationStatut() != StatutAffectation.PROPOSEE) {
            throw new BadRequestException("Aucune proposition en attente sur cette course.");
        }
        remise.setAffectationStatut(StatutAffectation.ANNULEE);
        remise.setAffectationReponseAt(LocalDateTime.now());
        remiseRepository.save(remise);
    }

    // ══ Côté transporteur ═══════════════════════════════════════════════════

    /** Ce que le transporteur voit dans son espace : propositions et course en cours. */
    @Transactional(readOnly = true)
    public List<CourseTransporteurDTO> mesCourses(Long transporteurId) {
        return remiseRepository.findByTransporteurId(transporteurId).stream()
                .filter(r -> r.getAffectationStatut() == StatutAffectation.PROPOSEE
                        || r.getAffectationStatut() == StatutAffectation.ACCEPTEE)
                .map(this::toCourseDTO)
                .toList();
    }

    /**
     * Accepte une course.
     *
     * Refuse si le transporteur est déjà pris : deux vendeurs peuvent lui avoir
     * proposé une course en même temps, et rien ne l'empêcherait d'accepter les
     * deux si on ne le vérifiait pas ici.
     */
    public CourseTransporteurDTO accepter(Long transporteurId, Long remiseId) {
        Remise remise = chargerCourseDuTransporteur(transporteurId, remiseId);

        if (remise.getAffectationStatut() != StatutAffectation.PROPOSEE) {
            throw new BadRequestException("Cette proposition n'est plus en attente.");
        }
        if (aUneCourseEnCours(transporteurId)) {
            throw new BadRequestException(
                    "Vous avez déjà une livraison en cours. Terminez-la avant d'en accepter une autre.");
        }

        remise.setAffectationStatut(StatutAffectation.ACCEPTEE);
        remise.setAffectationReponseAt(LocalDateTime.now());
        remiseRepository.save(remise);

        notifications.notifierReponseTransporteur(remise.getVendeurId(), remise.getCommandeId(),
                remise.getTransporteurNom(), true, null);

        log.info("Course {} acceptée par le transporteur {}.", remiseId, transporteurId);
        return toCourseDTO(remise);
    }

    /** Décline. La place se libère aussitôt pour le vendeur comme pour lui. */
    public void refuser(Long transporteurId, Long remiseId, String motif) {
        Remise remise = chargerCourseDuTransporteur(transporteurId, remiseId);

        if (remise.getAffectationStatut() != StatutAffectation.PROPOSEE) {
            throw new BadRequestException("Cette proposition n'est plus en attente.");
        }

        remise.setAffectationStatut(StatutAffectation.REFUSEE);
        remise.setAffectationReponseAt(LocalDateTime.now());
        remise.setAffectationRefusMotif(motif != null && !motif.isBlank() ? motif.trim() : null);
        remiseRepository.save(remise);

        notifications.notifierReponseTransporteur(remise.getVendeurId(), remise.getCommandeId(),
                remise.getTransporteurNom(), false, remise.getAffectationRefusMotif());

        log.info("Course {} refusée par le transporteur {}.", remiseId, transporteurId);
    }

    // ══ Disponibilité ═══════════════════════════════════════════════════════

    /**
     * Le transporteur est-il mobilisé ?
     *
     * Une course compte tant que tous ses animaux ne sont pas remis. Un échec de
     * livraison ne libère donc pas : la course reste la sienne jusqu'à ce qu'elle
     * aboutisse ou soit reprise par le vendeur.
     */
    @Transactional(readOnly = true)
    public boolean aUneCourseEnCours(Long transporteurId) {
        return remiseRepository.findByTransporteurId(transporteurId).stream()
                .filter(r -> r.getAffectationStatut() == StatutAffectation.ACCEPTEE)
                .anyMatch(r -> articles(r).stream()
                        .anyMatch(i -> COURSE_EN_COURS.contains(i.getStatutLivraison())));
    }

    /** Identité vérifiée et permis approuvé : les deux, pas l'un ou l'autre. */
    private boolean estHabilite(User transporteur) {
        return transporteur.getRole() == Role.TRANSPORTEUR
                && transporteur.isPermisValide()
                && transporteur.getKycStatus() == KycStatus.VALIDATED;
    }

    // ══ Interne ═════════════════════════════════════════════════════════════

    private Remise chargerRemiseDuVendeur(Long vendeurId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Livraison introuvable."));
        if (!Objects.equals(remise.getVendeurId(), vendeurId)) {
            throw new ForbiddenException("Cette livraison ne fait pas partie de vos ventes.");
        }
        return remise;
    }

    private Remise chargerCourseDuTransporteur(Long transporteurId, Long remiseId) {
        Remise remise = remiseRepository.findById(remiseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course introuvable."));
        if (!Objects.equals(remise.getTransporteurId(), transporteurId)) {
            throw new ForbiddenException("Cette course ne vous a pas été proposée.");
        }
        return remise;
    }

    private List<CommandeItem> articles(Remise remise) {
        return commandeItemRepository.findByCommandeIdAndVendeurId(
                remise.getCommandeId(), remise.getVendeurId());
    }

    /**
     * Vue d'une course pour le transporteur.
     *
     * Comme pour le lien de convoyage : ni prix, ni montant, ni code de remise.
     * Il transporte, il ne négocie pas — et le code, c'est l'acheteur qui le lui
     * dira sur place.
     */
    private CourseTransporteurDTO toCourseDTO(Remise remise) {
        List<CommandeItem> articles = articles(remise);
        boolean termine = !articles.isEmpty() && articles.stream()
                .allMatch(i -> i.getStatutLivraison() == StatutLivraison.RECEPTIONNE);

        User vendeur = userRepository.findById(remise.getVendeurId()).orElse(null);

        return new CourseTransporteurDTO(
                remise.getId(),
                remise.getCommandeId(),
                remise.getAffectationStatut(),
                remise.getAffectationAt(),
                articles.stream().map(CommandeItem::getAnimalNom).toList(),
                articles.stream().map(CommandeItem::getId).toList(),
                articles.isEmpty() ? null : articles.get(0).getLocalisation(),
                vendeur != null ? (vendeur.getSurname() + " " + vendeur.getName()).trim() : null,
                vendeur != null ? vendeur.getPhone() : null,
                remise.getAdresseLigne(),
                remise.getAdresseVille(),
                remise.getAdresseIndications(),
                remise.getDestinataireNom(),
                remise.getDestinataireTelephone(),
                remise.getDestinationLatitude(),
                remise.getDestinationLongitude(),
                remise.getDepartAt(),
                termine
        );
    }
}
