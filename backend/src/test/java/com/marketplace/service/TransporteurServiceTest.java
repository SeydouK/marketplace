package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.KycStatus;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Remise;
import com.marketplace.model.Role;
import com.marketplace.model.StatutAffectation;
import com.marketplace.model.StatutLivraison;
import com.marketplace.model.TypeVehicule;
import com.marketplace.model.User;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
import com.marketplace.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * L'affectation décide qui a le droit de transporter un animal de plusieurs
 * centaines de milliers de francs. Ces tests visent les deux règles qui portent
 * ce choix : ne montrer que des transporteurs validés, et n'en mobiliser qu'un
 * seul à la fois.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Affectation des transporteurs")
class TransporteurServiceTest {

    private static final Long REMISE = 1L;
    private static final Long VENDEUR = 5L;
    private static final Long COMMANDE = 10L;
    private static final Long TRANSPORTEUR = 20L;

    @Mock private UserRepository userRepository;
    @Mock private RemiseRepository remiseRepository;
    @Mock private CommandeItemRepository commandeItemRepository;
    @Mock private UserService userService;
    // Les notifications ne sont pas l'objet de ces tests, mais le service les
    // appelle : sans ce double, @InjectMocks passe null et tout casse.
    @Mock private NotificationLivraisonService notifications;

    @InjectMocks private TransporteurService service;

    private Remise remise;
    private User transporteur;
    private CommandeItem bovin;

    @BeforeEach
    void setUp() {
        remise = new Remise();
        remise.setId(REMISE);
        remise.setCommandeId(COMMANDE);
        remise.setVendeurId(VENDEUR);
        remise.setModeRemise(ModeRemise.TRANSPORT);

        transporteur = habilite(TRANSPORTEUR, "Traoré");

        Commande commande = new Commande();
        commande.setId(COMMANDE);

        bovin = new CommandeItem();
        bovin.setId(100L);
        bovin.setCommande(commande);
        bovin.setAnimalNom("BOVIN");
        bovin.setVendeurId(VENDEUR);
        bovin.setStatutLivraison(StatutLivraison.PRET);

        when(remiseRepository.findById(REMISE)).thenReturn(Optional.of(remise));
        when(remiseRepository.save(any(Remise.class))).thenAnswer(i -> i.getArgument(0));
        when(userRepository.findById(TRANSPORTEUR)).thenReturn(Optional.of(transporteur));
        when(commandeItemRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                .thenReturn(List.of(bovin));
        when(remiseRepository.findByTransporteurId(TRANSPORTEUR)).thenReturn(List.of());
    }

    private User habilite(Long id, String nom) {
        User u = new User();
        u.setId(id);
        u.setName(nom);
        u.setSurname("M.");
        u.setPhone("+2250701020304");
        u.setRole(Role.TRANSPORTEUR);
        u.setPermisValide(true);
        u.setKycStatus(KycStatus.VALIDATED);
        u.setTypeVehicule(TypeVehicule.BETAILLERE);
        u.setCapaciteTetes(8);
        return u;
    }

    // ══ Qui est proposable ══════════════════════════════════════════════════

    @Nested
    @DisplayName("Liste des disponibles")
    class Disponibles {

        @Test
        @DisplayName("montre un transporteur validé et libre")
        void montreLesHabilites() {
            when(userRepository.findByRole(Role.TRANSPORTEUR)).thenReturn(List.of(transporteur));

            assertThat(service.listerDisponibles())
                    .singleElement()
                    .satisfies(t -> {
                        assertThat(t.getNom()).isEqualTo("M. Traoré");
                        assertThat(t.getTypeVehicule()).isEqualTo(TypeVehicule.BETAILLERE);
                        assertThat(t.getCapaciteTetes()).isEqualTo(8);
                    });
        }

        @Test
        @DisplayName("cache celui dont le permis n'est pas validé")
        void cachePermisNonValide() {
            transporteur.setPermisValide(false);
            when(userRepository.findByRole(Role.TRANSPORTEUR)).thenReturn(List.of(transporteur));

            assertThat(service.listerDisponibles()).isEmpty();
        }

        @Test
        @DisplayName("cache celui dont le KYC n'est pas validé")
        void cacheKycNonValide() {
            transporteur.setKycStatus(KycStatus.CNI_UPLOADED);
            when(userRepository.findByRole(Role.TRANSPORTEUR)).thenReturn(List.of(transporteur));

            assertThat(service.listerDisponibles()).isEmpty();
        }

        @Test
        @DisplayName("cache celui qui est déjà sur une course")
        void cacheLOccupe() {
            Remise enCours = new Remise();
            enCours.setCommandeId(COMMANDE);
            enCours.setVendeurId(VENDEUR);
            enCours.setTransporteurId(TRANSPORTEUR);
            enCours.setAffectationStatut(StatutAffectation.ACCEPTEE);
            when(remiseRepository.findByTransporteurId(TRANSPORTEUR)).thenReturn(List.of(enCours));
            when(userRepository.findByRole(Role.TRANSPORTEUR)).thenReturn(List.of(transporteur));

            assertThat(service.listerDisponibles()).isEmpty();
        }

        @Test
        @DisplayName("le remontre une fois sa course terminée")
        void leLibereALaFin() {
            bovin.setStatutLivraison(StatutLivraison.RECEPTIONNE);
            Remise terminee = new Remise();
            terminee.setCommandeId(COMMANDE);
            terminee.setVendeurId(VENDEUR);
            terminee.setTransporteurId(TRANSPORTEUR);
            terminee.setAffectationStatut(StatutAffectation.ACCEPTEE);
            when(remiseRepository.findByTransporteurId(TRANSPORTEUR)).thenReturn(List.of(terminee));
            when(userRepository.findByRole(Role.TRANSPORTEUR)).thenReturn(List.of(transporteur));

            assertThat(service.listerDisponibles()).hasSize(1);
        }
    }

    // ══ Proposer ════════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Proposition du vendeur")
    class Proposition {

        @Test
        @DisplayName("laisse le transporteur libre tant qu'il n'a pas répondu")
        void proposeSansMobiliser() {
            service.proposer(VENDEUR, REMISE, TRANSPORTEUR);

            assertThat(remise.getAffectationStatut()).isEqualTo(StatutAffectation.PROPOSEE);
            assertThat(remise.getTransporteurId()).isEqualTo(TRANSPORTEUR);
            assertThat(service.aUneCourseEnCours(TRANSPORTEUR)).isFalse();
        }

        @Test
        @DisplayName("refuse un transporteur non validé")
        void refuseNonHabilite() {
            transporteur.setPermisValide(false);

            assertThatThrownBy(() -> service.proposer(VENDEUR, REMISE, TRANSPORTEUR))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("permis");
        }

        @Test
        @DisplayName("refuse un transporteur déjà en course")
        void refuseLOccupe() {
            Remise enCours = new Remise();
            enCours.setCommandeId(COMMANDE);
            enCours.setVendeurId(VENDEUR);
            enCours.setTransporteurId(TRANSPORTEUR);
            enCours.setAffectationStatut(StatutAffectation.ACCEPTEE);
            when(remiseRepository.findByTransporteurId(TRANSPORTEUR)).thenReturn(List.of(enCours));

            assertThatThrownBy(() -> service.proposer(VENDEUR, REMISE, TRANSPORTEUR))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("déjà sur une livraison");
        }

        @Test
        @DisplayName("refuse un retrait sur place")
        void refuseLeRetrait() {
            remise.setModeRemise(ModeRemise.RETRAIT_SUR_PLACE);

            assertThatThrownBy(() -> service.proposer(VENDEUR, REMISE, TRANSPORTEUR))
                    .isInstanceOf(BadRequestException.class);
        }

        @Test
        @DisplayName("refuse un vendeur qui n'est pas le propriétaire de la vente")
        void refuseUnAutreVendeur() {
            assertThatThrownBy(() -> service.proposer(99L, REMISE, TRANSPORTEUR))
                    .isInstanceOf(ForbiddenException.class);
        }
    }

    // ══ Répondre ════════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Réponse du transporteur")
    class Reponse {

        @BeforeEach
        void proposee() {
            remise.setTransporteurId(TRANSPORTEUR);
            remise.setAffectationStatut(StatutAffectation.PROPOSEE);
        }

        @Test
        @DisplayName("accepter le mobilise")
        void accepterMobilise() {
            service.accepter(TRANSPORTEUR, REMISE);

            assertThat(remise.getAffectationStatut()).isEqualTo(StatutAffectation.ACCEPTEE);
            assertThat(remise.getAffectationReponseAt()).isNotNull();
        }

        @Test
        @DisplayName("refuser libère la place aussitôt")
        void refuserLibere() {
            service.refuser(TRANSPORTEUR, REMISE, "Trop loin ce week-end");

            assertThat(remise.getAffectationStatut()).isEqualTo(StatutAffectation.REFUSEE);
            assertThat(remise.getAffectationRefusMotif()).isEqualTo("Trop loin ce week-end");
            assertThat(service.aUneCourseEnCours(TRANSPORTEUR)).isFalse();
        }

        @Test
        @DisplayName("empêche d'accepter deux courses proposées en même temps")
        void pasDeuxCoursesSimultanees() {
            Remise autre = new Remise();
            autre.setId(2L);
            autre.setCommandeId(COMMANDE);
            autre.setVendeurId(VENDEUR);
            autre.setTransporteurId(TRANSPORTEUR);
            autre.setAffectationStatut(StatutAffectation.ACCEPTEE);
            when(remiseRepository.findByTransporteurId(TRANSPORTEUR))
                    .thenReturn(List.of(autre, remise));

            assertThatThrownBy(() -> service.accepter(TRANSPORTEUR, REMISE))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("déjà une livraison en cours");
        }

        @Test
        @DisplayName("refuse de répondre à une course qui n'a pas été proposée à soi")
        void pasSaCourse() {
            assertThatThrownBy(() -> service.accepter(99L, REMISE))
                    .isInstanceOf(ForbiddenException.class);
        }

        @Test
        @DisplayName("refuse de répondre deux fois")
        void pasDeuxReponses() {
            remise.setAffectationStatut(StatutAffectation.ACCEPTEE);

            assertThatThrownBy(() -> service.accepter(TRANSPORTEUR, REMISE))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("n'est plus en attente");
        }
    }
}
