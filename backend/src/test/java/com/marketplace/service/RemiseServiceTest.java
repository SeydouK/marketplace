package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Remise;
import com.marketplace.model.StatutCommande;
import com.marketplace.model.StatutLivraison;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * La validation du code déclenche un virement Mobile Money : ce sont les seuls
 * tests du projet dont un échec signifie une perte d'argent réelle. Ils couvrent
 * donc en priorité les chemins où l'on paie à tort, ou l'on refuse à tort.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Code de remise")
class RemiseServiceTest {

    private static final Long COMMANDE = 10L;
    private static final Long VENDEUR = 5L;
    private static final Long ACHETEUR = 6L;
    private static final String BON_CODE = "4271";

    @Mock private RemiseRepository remiseRepository;
    @Mock private CommandeItemRepository commandeItemRepository;
    @Mock private JournalLivraisonService journal;
    @Mock private SequestreService sequestre;
    @Mock private NotificationLivraisonService notifications;

    @InjectMocks private RemiseService service;

    private Remise remise;
    private CommandeItem bovin;

    @BeforeEach
    void setUp() {
        remise = new Remise();
        remise.setId(1L);
        remise.setCommandeId(COMMANDE);
        remise.setVendeurId(VENDEUR);
        remise.setCode(BON_CODE);
        remise.setTentatives(0);

        bovin = item(100L, "BOVIN", StatutLivraison.PRET);

        when(remiseRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                .thenReturn(Optional.of(remise));
        when(commandeItemRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                .thenReturn(List.of(bovin));
        when(remiseRepository.save(any(Remise.class))).thenAnswer(i -> i.getArgument(0));
        when(commandeItemRepository.save(any(CommandeItem.class))).thenAnswer(i -> i.getArgument(0));
    }

    private CommandeItem item(Long id, String nom, StatutLivraison statut) {
        Commande commande = new Commande();
        commande.setId(COMMANDE);
        commande.setUserId(ACHETEUR);
        commande.setStatut(StatutCommande.PAYEE);

        CommandeItem item = new CommandeItem();
        item.setId(id);
        item.setCommande(commande);
        item.setAnimalNom(nom);
        item.setVendeurId(VENDEUR);
        item.setPrixUnitaire(BigDecimal.valueOf(52_000));
        item.setQuantite(1);
        item.setStatutLivraison(statut);
        return item;
    }

    // ══ Le chemin nominal ═══════════════════════════════════════════════════

    @Nested
    @DisplayName("Quand le code est correct")
    class CodeCorrect {

        @Test
        @DisplayName("solde l'animal et lève le séquestre")
        void soldeEtLibere() {
            int soldes = service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg");

            assertThat(soldes).isEqualTo(1);
            assertThat(bovin.getStatutLivraison()).isEqualTo(StatutLivraison.RECEPTIONNE);
            assertThat(bovin.getReceptionneAt()).isNotNull();
            assertThat(bovin.getPhotoRemiseUrl()).isEqualTo("/api/files/x.jpg");
            verify(sequestre).libererSiLeve(COMMANDE, VENDEUR);
        }

        @Test
        @DisplayName("prévient le vendeur quand le séquestre se lève")
        void previentLeVendeur() {
            when(sequestre.libererSiLeve(COMMANDE, VENDEUR)).thenReturn(true);
            when(sequestre.montantNet(COMMANDE, VENDEUR)).thenReturn(BigDecimal.valueOf(49_820));

            service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg");

            verify(notifications).notifierFondsLiberes(VENDEUR, COMMANDE, BigDecimal.valueOf(49_820));
        }

        @Test
        @DisplayName("remet le compteur de tentatives à zéro")
        void reinitialiseLesTentatives() {
            remise.setTentatives(2);

            service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg");

            assertThat(remise.getTentatives()).isZero();
            assertThat(remise.getBloqueeJusquA()).isNull();
        }

        @Test
        @DisplayName("accepte un code saisi avec des espaces")
        void tolereLesEspaces() {
            service.validerCode(VENDEUR, COMMANDE, List.of(100L), "  4271 ", "/api/files/x.jpg");

            assertThat(bovin.getStatutLivraison()).isEqualTo(StatutLivraison.RECEPTIONNE);
        }
    }

    // ══ Les refus ═══════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Quand le code est refusé")
    class CodeRefuse {

        @Test
        @DisplayName("ne libère jamais les fonds")
        void neLibereRien() {
            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), "0000", "/api/files/x.jpg"))
                    .isInstanceOf(BadRequestException.class);

            assertThat(bovin.getStatutLivraison()).isEqualTo(StatutLivraison.PRET);
            verify(sequestre, never()).libererSiLeve(anyLong(), anyLong());
        }

        @Test
        @DisplayName("bloque la remise après trois tentatives")
        void bloqueApresTroisTentatives() {
            for (int i = 0; i < 3; i++) {
                assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), "0000", "/api/files/x.jpg"))
                        .isInstanceOf(BadRequestException.class);
            }

            assertThat(remise.getTentatives()).isEqualTo(3);
            assertThat(remise.getBloqueeJusquA()).isNotNull();
        }

        @Test
        @DisplayName("refuse même le bon code tant que le blocage court")
        void refuseLeBonCodePendantLeBlocage() {
            remise.setTentatives(3);
            remise.setBloqueeJusquA(LocalDateTime.now().plusMinutes(10));

            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("Trop de tentatives");

            verify(sequestre, never()).libererSiLeve(anyLong(), anyLong());
        }
    }

    // ══ Les garde-fous ══════════════════════════════════════════════════════

    @Nested
    @DisplayName("Garde-fous")
    class GardeFous {

        @Test
        @DisplayName("exige une photo de remise")
        void photoObligatoire() {
            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "  "))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("photo");

            verify(sequestre, never()).libererSiLeve(anyLong(), anyLong());
        }

        @Test
        @DisplayName("refuse de solder deux fois le même animal")
        void refuseUneDoubleRemise() {
            bovin.setStatutLivraison(StatutLivraison.RECEPTIONNE);

            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("déjà été remis");
        }

        @Test
        @DisplayName("refuse de valider un animal en litige")
        void refuseSiLitige() {
            bovin.setStatutLivraison(StatutLivraison.LITIGE);

            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("litige");

            verify(sequestre, never()).libererSiLeve(anyLong(), anyLong());
        }

        @Test
        @DisplayName("refuse un animal qui n'appartient pas à la vente")
        void refuseUnAnimalEtranger() {
            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L, 999L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(ForbiddenException.class);
        }

        @Test
        @DisplayName("refuse si la commande n'est pas payée")
        void refuseSiCommandeNonPayee() {
            bovin.getCommande().setStatut(StatutCommande.EN_ATTENTE);

            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("pas payée");
        }

        @Test
        @DisplayName("refuse quand aucun code n'existe pour cette vente")
        void refuseSansRemise() {
            when(remiseRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg"))
                    .isInstanceOf(ResourceNotFoundException.class);
        }
    }

    // ══ Remise en plusieurs fois ════════════════════════════════════════════

    @Nested
    @DisplayName("Remise partielle")
    class RemisePartielle {

        @Test
        @DisplayName("ne solde que les animaux désignés")
        void soldeSeulementLesDesignes() {
            CommandeItem mouton = item(101L, "MOUTON", StatutLivraison.PRET);
            when(commandeItemRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                    .thenReturn(List.of(bovin, mouton));

            int soldes = service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg");

            assertThat(soldes).isEqualTo(1);
            assertThat(bovin.getStatutLivraison()).isEqualTo(StatutLivraison.RECEPTIONNE);
            assertThat(mouton.getStatutLivraison()).isEqualTo(StatutLivraison.PRET);
        }

        @Test
        @DisplayName("laisse le code utilisable pour le reste de la vente")
        void laisseLeCodeUtilisable() {
            CommandeItem mouton = item(101L, "MOUTON", StatutLivraison.PRET);
            when(commandeItemRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                    .thenReturn(List.of(bovin, mouton));

            service.validerCode(VENDEUR, COMMANDE, List.of(100L), BON_CODE, "/api/files/x.jpg");
            service.validerCode(VENDEUR, COMMANDE, List.of(101L), BON_CODE, "/api/files/y.jpg");

            assertThat(mouton.getStatutLivraison()).isEqualTo(StatutLivraison.RECEPTIONNE);
        }
    }

    // ══ Génération ══════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Génération du code")
    class Generation {

        @Test
        @DisplayName("produit un code à quatre chiffres par vendeur")
        void unCodeParVendeur() {
            Commande commande = new Commande();
            commande.setId(COMMANDE);
            CommandeItem a = item(100L, "BOVIN", StatutLivraison.A_REMETTRE);
            CommandeItem b = item(101L, "MOUTON", StatutLivraison.A_REMETTRE);
            b.setVendeurId(7L);
            commande.setItems(List.of(a, b));

            when(remiseRepository.findByCommandeIdAndVendeurId(anyLong(), anyLong())).thenReturn(Optional.empty());

            service.genererPourCommande(commande);

            ArgumentCaptor<Remise> captor = ArgumentCaptor.forClass(Remise.class);
            verify(remiseRepository, org.mockito.Mockito.times(2)).save(captor.capture());
            assertThat(captor.getAllValues())
                    .allSatisfy(r -> assertThat(r.getCode()).matches("\\d{4}"))
                    .extracting(Remise::getVendeurId)
                    .containsExactlyInAnyOrder(VENDEUR, 7L);
        }

        @Test
        @DisplayName("transmet le code à l'acheteur, jamais au vendeur")
        void transmetALAcheteur() {
            Commande commande = new Commande();
            commande.setId(COMMANDE);
            commande.setUserId(ACHETEUR);
            commande.setItems(List.of(item(100L, "BOVIN", StatutLivraison.A_REMETTRE)));
            when(remiseRepository.findByCommandeIdAndVendeurId(anyLong(), anyLong())).thenReturn(Optional.empty());

            service.genererPourCommande(commande);

            verify(notifications).envoyerCodeDeRemise(
                    org.mockito.ArgumentMatchers.eq(ACHETEUR),
                    org.mockito.ArgumentMatchers.eq(COMMANDE),
                    any(), org.mockito.ArgumentMatchers.anyString(), any());
        }

        @Test
        @DisplayName("ne regénère pas un code déjà émis")
        void idempotent() {
            Commande commande = new Commande();
            commande.setId(COMMANDE);
            commande.setItems(List.of(item(100L, "BOVIN", StatutLivraison.A_REMETTRE)));

            service.genererPourCommande(commande);

            verify(remiseRepository, never()).save(any(Remise.class));
        }
    }
}
