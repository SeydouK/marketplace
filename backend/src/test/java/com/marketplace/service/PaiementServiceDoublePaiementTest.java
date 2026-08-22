package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.model.AnimalStatus;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.Panier;
import com.marketplace.model.PanierItem;
import com.marketplace.model.StatutCommande;
import com.marketplace.repository.AnimalRepository;
import com.marketplace.repository.CommandeRepository;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Le risque de double prelevement, a la creation d'une commande.
 *
 * <p>Le scenario que ces tests verrouillent : un acheteur paie, le webhook se
 * perd, il ne voit rien venir, modifie son panier et reclique « Payer ». Le code
 * annulait alors la commande precedente sur le seul constat que le panier avait
 * change — sans jamais demander a l'operateur si elle avait ete payee. Deux
 * prelevements, une commande « annulee » chez nous, et personne pour s'en
 * apercevoir.
 *
 * <p>La regle a tenir tient en une phrase : <strong>ne jamais abandonner une
 * commande sans avoir confirme qu'elle n'a pas ete payee</strong>, et traiter
 * l'absence de reponse comme une non-reponse, pas comme un non-paiement.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Creation de commande : protection contre le double paiement")
class PaiementServiceDoublePaiementTest {

    private static final Long ACHETEUR = 7L;
    private static final UUID ANIMAL_ANCIEN = UUID.randomUUID();
    private static final UUID ANIMAL_NOUVEAU = UUID.randomUUID();
    private static final String REFERENCE = "GP-REF-123";

    @Mock private CommandeRepository commandeRepository;
    @Mock private AnimalRepository animalRepository;
    @Mock private PanierService panierService;
    @Mock private GeniusPayService geniusPayService;
    @Mock private UserService userService;
    @Mock private UserRepository userRepository;
    @Mock private VersementService versementService;
    @Mock private RemiseService remiseService;

    @InjectMocks private PaiementService service;

    /** Le panier courant : il contient un animal different de la commande en attente. */
    private Panier panierModifie;

    /** La commande deja creee, en attente, portant un lien de paiement. */
    private Commande enAttente;

    @BeforeEach
    void setUp() {
        panierModifie = new Panier();
        panierModifie.setUserId(ACHETEUR);
        panierModifie.setItems(List.of(item(ANIMAL_NOUVEAU, new BigDecimal("300000"))));

        enAttente = new Commande();
        enAttente.setId(41L);
        enAttente.setUserId(ACHETEUR);
        enAttente.setMontant(new BigDecimal("500000"));
        enAttente.setStatut(StatutCommande.EN_ATTENTE);
        enAttente.setReference(REFERENCE);
        enAttente.setCheckoutUrl("https://geniuspay.test/pay/" + REFERENCE);
        enAttente.setCreatedAt(LocalDateTime.now().minusMinutes(3));
        enAttente.getItems().add(commandeItem(ANIMAL_ANCIEN));

        when(panierService.getOuCreerPanier(ACHETEUR)).thenReturn(panierModifie);
        when(commandeRepository.findByUserIdAndStatut(ACHETEUR, StatutCommande.EN_ATTENTE))
                .thenReturn(List.of(enAttente));
        when(commandeRepository.save(any(Commande.class))).thenAnswer(a -> a.getArgument(0));
    }

    // ══ Le cas qui coutait de l'argent ══════════════════════════════════════

    @Nested
    @DisplayName("Quand la commande precedente avait ete payee")
    class DejaPayee {

        @BeforeEach
        void paiementAbouti() {
            when(geniusPayService.getPaymentStatus(REFERENCE)).thenReturn("completed");
            // La transition est confiee a la base par une mise a jour conditionnelle :
            // elle ne rend 1 que si la commande etait encore EN_ATTENTE. C'est ce
            // qui empeche le webhook et la reconciliation de jouer deux fois les
            // memes effets. Sans ce double, aucun effet n'est declenche.
            when(commandeRepository.marquerPayeeSiEnAttente(anyLong(), any(), any(), any()))
                    .thenReturn(1);
        }

        @Test
        @DisplayName("elle n'est pas annulee")
        void neLAnnulePas() {
            service.creerCommande(ACHETEUR);
            assertThat(enAttente.getStatut()).isNotEqualTo(StatutCommande.ANNULEE);
        }

        @Test
        @DisplayName("ses animaux ne sont pas remis en vente")
        void neLibereRien() {
            service.creerCommande(ACHETEUR);
            verify(animalRepository, never()).changerStatutSiEnMasse(
                    anyList(), eq(AnimalStatus.RESERVE), eq(AnimalStatus.DISPONIBLE));
        }

        @Test
        @DisplayName("aucun second lien de paiement n'est cree")
        void neRecreePasDeLien() {
            service.creerCommande(ACHETEUR);
            verify(geniusPayService, never()).createPayment(any(), any(), any(), any(), any());
        }

        @Test
        @DisplayName("le paiement retrouve est applique, et la commande payee est rendue")
        void rendLaCommandePayee() {
            var dto = service.creerCommande(ACHETEUR);

            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.PAYEE);
            // Le client doit pouvoir distinguer ce cas : sans cela il renverrait
            // l'acheteur vers un lien de paiement deja consomme.
            assertThat(dto.getStatut()).isEqualTo(StatutCommande.PAYEE);
            assertThat(dto.getId()).isEqualTo(41L);
        }
    }

    // ══ L'absence de reponse n'est pas un non-paiement ══════════════════════

    @Nested
    @DisplayName("Quand l'operateur ne repond pas")
    class Indetermine {

        @Test
        @DisplayName("une panne du service de paiement bloque plutot que d'annuler")
        void panneNAnnulePas() {
            when(geniusPayService.getPaymentStatus(REFERENCE))
                    .thenThrow(new RuntimeException("timeout"));

            assertThatThrownBy(() -> service.creerCommande(ACHETEUR))
                    .isInstanceOf(BadRequestException.class);

            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.EN_ATTENTE);
            verify(geniusPayService, never()).createPayment(any(), any(), any(), any(), any());
        }

        @Test
        @DisplayName("un paiement en cours de traitement bloque aussi")
        void enCoursDeTraitementNAnnulePas() {
            // « processing » peut aboutir dans la seconde qui suit : annuler ici
            // rouvre exactement la fenetre que ce correctif ferme.
            when(geniusPayService.getPaymentStatus(REFERENCE)).thenReturn("processing");

            assertThatThrownBy(() -> service.creerCommande(ACHETEUR))
                    .isInstanceOf(BadRequestException.class);
            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.EN_ATTENTE);
        }

        @Test
        @DisplayName("un statut inconnu est traite comme une non-reponse")
        void statutInconnuNAnnulePas() {
            when(geniusPayService.getPaymentStatus(REFERENCE)).thenReturn("quelque_chose_de_neuf");

            assertThatThrownBy(() -> service.creerCommande(ACHETEUR))
                    .isInstanceOf(BadRequestException.class);
            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.EN_ATTENTE);
        }

        @Test
        @DisplayName("une reponse vide est traitee comme une non-reponse")
        void reponseVideNAnnulePas() {
            when(geniusPayService.getPaymentStatus(REFERENCE)).thenReturn(null);

            assertThatThrownBy(() -> service.creerCommande(ACHETEUR))
                    .isInstanceOf(BadRequestException.class);
            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.EN_ATTENTE);
        }
    }

    // ══ Le non-paiement confirme garde l'ancien comportement ════════════════

    @Nested
    @DisplayName("Quand le non-paiement est confirme")
    class NonPayee {

        @Test
        @DisplayName("la commande abandonnee est annulee et ses animaux liberes")
        void annuleCommeAvant() {
            when(geniusPayService.getPaymentStatus(REFERENCE)).thenReturn("pending");
            when(animalRepository.changerStatutSiEnMasse(anyList(), any(), any())).thenReturn(1);
            when(animalRepository.changerStatutSi(any(), any(), any())).thenReturn(1);
            when(geniusPayService.createPayment(any(), any(), any(), any(), any()))
                    .thenReturn(new GeniusPayService.PaymentCreationResult("GP-NEW", "https://pay/new"));

            service.creerCommande(ACHETEUR);

            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.ANNULEE);
            verify(animalRepository).changerStatutSiEnMasse(
                    anyList(), eq(AnimalStatus.RESERVE), eq(AnimalStatus.DISPONIBLE));
        }

        @Test
        @DisplayName("une commande sans lien de paiement est annulee sans interroger l'operateur")
        void sansReferenceOnNInterrogePas() {
            // Aucune session de paiement n'a jamais existe : rien n'a pu etre
            // preleve, et un appel reseau serait du gaspillage.
            enAttente.setReference(null);
            enAttente.setCheckoutUrl(null);
            when(animalRepository.changerStatutSiEnMasse(anyList(), any(), any())).thenReturn(1);
            when(animalRepository.changerStatutSi(any(), any(), any())).thenReturn(1);
            when(geniusPayService.createPayment(any(), any(), any(), any(), any()))
                    .thenReturn(new GeniusPayService.PaymentCreationResult("GP-NEW", "https://pay/new"));

            service.creerCommande(ACHETEUR);

            verify(geniusPayService, never()).getPaymentStatus(any());
            assertThat(enAttente.getStatut()).isEqualTo(StatutCommande.ANNULEE);
        }
    }

    // ══ Outils ═════════════════════════════════════════════════════════════

    private PanierItem item(UUID animalId, BigDecimal prix) {
        PanierItem item = new PanierItem();
        item.setAnimalId(animalId);
        item.setAnimalNom("Animal");
        item.setPrixUnitaire(prix);
        item.setQuantite(1);
        item.setVendeurId(5L);
        item.setVendeurNom("Vendeur");
        return item;
    }

    private CommandeItem commandeItem(UUID animalId) {
        CommandeItem item = new CommandeItem();
        item.setAnimalId(animalId);
        item.setAnimalNom("Animal");
        item.setPrixUnitaire(new BigDecimal("500000"));
        item.setQuantite(1);
        item.setVendeurId(5L);
        return item;
    }
}
