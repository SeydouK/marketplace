package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.model.Commande;
import com.marketplace.model.ModeReglement;
import com.marketplace.model.Remboursement;
import com.marketplace.model.Role;
import com.marketplace.model.StatutRemboursement;
import com.marketplace.model.StatutVersement;
import com.marketplace.model.User;
import com.marketplace.model.Versement;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.CommandeRepository;
import com.marketplace.repository.RemboursementRepository;
import com.marketplace.repository.UserRepository;
import com.marketplace.repository.VersementRepository;
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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Le registre des remboursements décide de sommes réellement dues à des personnes.
 * Ces tests visent les deux fautes qui coûtent : rendre plus que ce qui a été
 * encaissé, et payer le vendeur d'une commande qu'on est en train de rembourser.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Remboursements")
class RemboursementServiceTest {

    private static final Long COMMANDE = 10L;
    private static final Long ACHETEUR = 6L;
    private static final BigDecimal MONTANT_COMMANDE = BigDecimal.valueOf(52_000);

    @Mock private RemboursementRepository remboursementRepository;
    @Mock private CommandeRepository commandeRepository;
    @Mock private CommandeItemRepository commandeItemRepository;
    @Mock private VersementRepository versementRepository;
    @Mock private AnimalRepository animalRepository;
    @Mock private UserRepository userRepository;
    @Mock private UserService userService;

    @InjectMocks private RemboursementService service;

    private Commande commande;
    private User admin;

    @BeforeEach
    void setUp() {
        commande = new Commande();
        commande.setId(COMMANDE);
        commande.setUserId(ACHETEUR);
        commande.setMontant(MONTANT_COMMANDE);

        admin = new User();
        admin.setId(1L);
        admin.setRole(Role.ADMIN);

        when(commandeRepository.findById(COMMANDE)).thenReturn(Optional.of(commande));
        when(remboursementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of());
        when(remboursementRepository.save(any(Remboursement.class))).thenAnswer(i -> {
            Remboursement r = i.getArgument(0);
            if (r.getId() == null) r.setId(99L);
            return r;
        });
        when(versementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of());
        when(commandeItemRepository.findByCommandeId(COMMANDE)).thenReturn(List.of());
        when(userService.getCurrentUser()).thenReturn(admin);
    }

    @Nested
    @DisplayName("Création")
    class Creation {

        @Test
        @DisplayName("inscrit la somme due à l'acheteur")
        void inscritLaSomme() {
            Remboursement r = service.creer(COMMANDE, BigDecimal.valueOf(52_000), "Animal mort en transit", false);

            assertThat(r.getAcheteurId()).isEqualTo(ACHETEUR);
            assertThat(r.getMontant()).isEqualByComparingTo("52000");
            assertThat(r.getStatut()).isEqualTo(StatutRemboursement.EN_ATTENTE);
            assertThat(r.getMotif()).isEqualTo("Animal mort en transit");
        }

        @Test
        @DisplayName("refuse de rendre plus que ce qui a été encaissé")
        void refuseDeDepasserLEncaisse() {
            assertThatThrownBy(() -> service.creer(COMMANDE, BigDecimal.valueOf(60_000), "Trop", false))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("dépasserait le montant encaissé");
        }

        @Test
        @DisplayName("tient compte des remboursements déjà inscrits")
        void cumuleLesRemboursements() {
            Remboursement precedent = new Remboursement();
            precedent.setMontant(BigDecimal.valueOf(40_000));
            precedent.setStatut(StatutRemboursement.CONFIRME);
            when(remboursementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of(precedent));

            assertThatThrownBy(() -> service.creer(COMMANDE, BigDecimal.valueOf(20_000), "Le reste", false))
                    .isInstanceOf(BadRequestException.class);

            // 12 000 restent possibles.
            assertThat(service.creer(COMMANDE, BigDecimal.valueOf(12_000), "Le reste", false)).isNotNull();
        }

        @Test
        @DisplayName("ignore les remboursements échoués dans le cumul")
        void ignoreLesEchecs() {
            Remboursement echoue = new Remboursement();
            echoue.setMontant(BigDecimal.valueOf(52_000));
            echoue.setStatut(StatutRemboursement.ECHOUE);
            when(remboursementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of(echoue));

            assertThat(service.creer(COMMANDE, BigDecimal.valueOf(52_000), "Nouvelle tentative", false))
                    .isNotNull();
        }

        @Test
        @DisplayName("exige un motif")
        void motifObligatoire() {
            assertThatThrownBy(() -> service.creer(COMMANDE, BigDecimal.valueOf(1_000), "  ", false))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("motif");
        }

        @Test
        @DisplayName("refuse un montant nul ou négatif")
        void montantPositif() {
            assertThatThrownBy(() -> service.creer(COMMANDE, BigDecimal.ZERO, "Motif", false))
                    .isInstanceOf(BadRequestException.class);
        }
    }

    @Nested
    @DisplayName("Protection contre le double paiement")
    class DoublePaiement {

        @Test
        @DisplayName("regèle le versement du vendeur pas encore envoyé")
        void regeleLeVersement() {
            Versement versement = new Versement();
            versement.setId(7L);
            versement.setStatut(StatutVersement.EN_ATTENTE);
            when(versementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of(versement));

            service.creer(COMMANDE, BigDecimal.valueOf(52_000), "Animal mort", false);

            assertThat(versement.getStatut()).isEqualTo(StatutVersement.BLOQUE);
            assertThat(versement.getLibereAt()).isNull();
        }

        @Test
        @DisplayName("laisse intact un versement déjà parti")
        void neTouchePasAUnVersementParti() {
            Versement parti = new Versement();
            parti.setId(8L);
            parti.setStatut(StatutVersement.CONFIRME);
            when(versementRepository.findByCommandeId(COMMANDE)).thenReturn(List.of(parti));

            service.creer(COMMANDE, BigDecimal.valueOf(52_000), "Animal mort", false);

            assertThat(parti.getStatut()).isEqualTo(StatutVersement.CONFIRME);
        }
    }

    @Nested
    @DisplayName("Règlement manuel")
    class Reglement {

        @Test
        @DisplayName("enregistre la référence, le canal et l'administrateur")
        void enregistreLaTrace() {
            Remboursement r = new Remboursement();
            r.setId(99L);
            r.setStatut(StatutRemboursement.EN_ATTENTE);
            when(remboursementRepository.findById(99L)).thenReturn(Optional.of(r));

            Remboursement regle = service.reglerManuellement(99L, "OM-4471829");

            assertThat(regle.getStatut()).isEqualTo(StatutRemboursement.CONFIRME);
            assertThat(regle.getModeReglement()).isEqualTo(ModeReglement.MANUEL);
            assertThat(regle.getReference()).isEqualTo("OM-4471829");
            assertThat(regle.getRegleParId()).isEqualTo(1L);
            assertThat(regle.getRegleAt()).isNotNull();
        }

        @Test
        @DisplayName("exige une référence de transaction")
        void referenceObligatoire() {
            Remboursement r = new Remboursement();
            r.setStatut(StatutRemboursement.EN_ATTENTE);
            when(remboursementRepository.findById(99L)).thenReturn(Optional.of(r));

            assertThatThrownBy(() -> service.reglerManuellement(99L, " "))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("référence");
        }

        @Test
        @DisplayName("refuse de régler deux fois")
        void pasDeDoubleReglement() {
            Remboursement r = new Remboursement();
            r.setStatut(StatutRemboursement.CONFIRME);
            when(remboursementRepository.findById(99L)).thenReturn(Optional.of(r));

            assertThatThrownBy(() -> service.reglerManuellement(99L, "OM-1"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("déjà été réglé");
        }

        @Test
        @DisplayName("refuse le règlement à qui n'est pas administrateur")
        void adminSeulement() {
            User vendeur = new User();
            vendeur.setId(5L);
            vendeur.setRole(Role.VENDEUR);
            when(userService.getCurrentUser()).thenReturn(vendeur);

            assertThatThrownBy(() -> service.reglerManuellement(99L, "OM-1"))
                    .isInstanceOf(ForbiddenException.class);
        }

        @Test
        @DisplayName("dit clairement que le règlement par API n'existe pas encore")
        void apiIndisponible() {
            assertThatThrownBy(() -> service.reglerParApi(99L))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("GeniusPay");
        }
    }

    @Nested
    @DisplayName("Sort des animaux")
    class Animaux {

        @Test
        @DisplayName("ne remet rien en vente quand on ne le demande pas")
        void pasDeRemiseEnVenteParDefaut() {
            service.creer(COMMANDE, BigDecimal.valueOf(52_000), "Animal mort en transit", false);

            verify(animalRepository, never()).changerStatutSiEnMasse(any(), any(), any());
        }
    }
}
