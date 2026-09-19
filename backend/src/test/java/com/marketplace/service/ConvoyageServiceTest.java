package com.marketplace.service;

import com.marketplace.dto.ConvoyageDTO;
import com.marketplace.dto.LienConvoyageDTO;
import com.marketplace.exception.BadRequestException;
import com.marketplace.exception.ForbiddenException;
import com.marketplace.exception.ResourceNotFoundException;
import com.marketplace.model.Commande;
import com.marketplace.model.CommandeItem;
import com.marketplace.model.ModeRemise;
import com.marketplace.model.Remise;
import com.marketplace.model.StatutLivraison;
import com.marketplace.repository.CommandeItemRepository;
import com.marketplace.repository.RemiseRepository;
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
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Le jeton de convoyage remplace un mot de passe : il ouvre l'accès à une
 * livraison sans compte. Ces tests visent donc deux choses — qu'il soit
 * imprévisible et vérifié, et que la vue qu'il ouvre ne laisse fuir aucune
 * donnée commerciale.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Lien de convoyage")
class ConvoyageServiceTest {

    private static final Long REMISE = 1L;
    private static final Long VENDEUR = 5L;
    private static final Long COMMANDE = 10L;

    @Mock private RemiseRepository remiseRepository;
    @Mock private CommandeItemRepository commandeItemRepository;
    @Mock private SuiviLivraisonService suiviService;
    @Mock private RemiseService remiseService;
    @Mock private FileStorageService fileStorageService;

    @InjectMocks private ConvoyageService service;

    private Remise remise;
    private CommandeItem bovin;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(service, "frontendUrl", "https://betailmarket.ci");

        remise = new Remise();
        remise.setId(REMISE);
        remise.setCommandeId(COMMANDE);
        remise.setVendeurId(VENDEUR);
        remise.setCode("4271");
        remise.setModeRemise(ModeRemise.TRANSPORT);
        remise.setAdresseLigne("Cocody Angré, 8e tranche");
        remise.setAdresseVille("Abidjan");
        remise.setAdresseIndications("Portail vert face à la pharmacie");
        remise.setDestinataireNom("Awa Koné");
        remise.setDestinataireTelephone("+2250701020304");

        Commande commande = new Commande();
        commande.setId(COMMANDE);
        commande.setMontant(BigDecimal.valueOf(450_000));

        bovin = new CommandeItem();
        bovin.setId(100L);
        bovin.setCommande(commande);
        bovin.setAnimalNom("BOVIN");
        bovin.setVendeurId(VENDEUR);
        bovin.setPrixUnitaire(BigDecimal.valueOf(450_000));
        bovin.setQuantite(1);
        bovin.setStatutLivraison(StatutLivraison.PRET);
        bovin.setLocalisation("Korhogo");

        when(remiseRepository.findById(REMISE)).thenReturn(Optional.of(remise));
        when(remiseRepository.save(any(Remise.class))).thenAnswer(i -> i.getArgument(0));
        when(commandeItemRepository.findByCommandeIdAndVendeurId(COMMANDE, VENDEUR))
                .thenReturn(List.of(bovin));
    }

    // ══ Confier ═════════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Quand le vendeur confie")
    class Confier {

        @Test
        @DisplayName("produit un lien et un jeton imprévisible")
        void produitUnLien() {
            LienConvoyageDTO lien = service.confier(VENDEUR, REMISE, "Traoré", "+225 07 01 02 03 04");

            assertThat(remise.getConvoyageJeton()).isNotBlank();
            // 32 octets en base64url sans remplissage : 43 caracteres.
            assertThat(remise.getConvoyageJeton()).hasSize(43);
            assertThat(lien.getLien()).startsWith("https://betailmarket.ci/convoyage/");
            assertThat(lien.getExpireLe()).isAfter(LocalDateTime.now());
        }

        @Test
        @DisplayName("prépare un message WhatsApp sans exposer le code de remise")
        void whatsappSansCode() {
            LienConvoyageDTO lien = service.confier(VENDEUR, REMISE, "Traoré", "+2250701020304");

            assertThat(lien.getLienWhatsApp()).startsWith("https://wa.me/2250701020304?text=");
            assertThat(lien.getLienWhatsApp()).doesNotContain("4271");
        }

        @Test
        @DisplayName("refuse un retrait sur place")
        void refuseLeRetrait() {
            remise.setModeRemise(ModeRemise.RETRAIT_SUR_PLACE);

            assertThatThrownBy(() -> service.confier(VENDEUR, REMISE, "Traoré", "+2250701020304"))
                    .isInstanceOf(BadRequestException.class)
                    .hasMessageContaining("retrait sur place");
        }

        @Test
        @DisplayName("refuse un vendeur qui n'est pas le sien")
        void refuseUnAutreVendeur() {
            assertThatThrownBy(() -> service.confier(99L, REMISE, "Traoré", "+2250701020304"))
                    .isInstanceOf(ForbiddenException.class);
        }

        @Test
        @DisplayName("remplace le jeton précédent quand on reconfie")
        void remplaceLeJeton() {
            service.confier(VENDEUR, REMISE, "Traoré", "+2250701020304");
            String premier = remise.getConvoyageJeton();

            service.confier(VENDEUR, REMISE, "Koné", "+2250505060708");

            assertThat(remise.getConvoyageJeton()).isNotEqualTo(premier);
        }
    }

    // ══ Numéro ══════════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Normalisation du numéro")
    class Numero {

        @Test
        @DisplayName("accepte les formats usuels et garde l'indicatif")
        void formatsAcceptes() {
            assertThat(service.normaliserNumero("+225 07 01 02 03 04")).isEqualTo("+2250701020304");
            assertThat(service.normaliserNumero("00225 0701020304")).isEqualTo("+2250701020304");
            assertThat(service.normaliserNumero("225-07-01-02-03-04")).isEqualTo("+2250701020304");
        }

        @Test
        @DisplayName("n'impose aucun pays")
        void multiPays() {
            assertThat(service.normaliserNumero("+33 6 12 34 56 78")).isEqualTo("+33612345678");
            assertThat(service.normaliserNumero("+226 70 11 22 33")).isEqualTo("+22670112233");
        }

        @Test
        @DisplayName("refuse un numéro trop court ou vide")
        void refuseInvalide() {
            assertThatThrownBy(() -> service.normaliserNumero("0701"))
                    .isInstanceOf(BadRequestException.class);
            assertThatThrownBy(() -> service.normaliserNumero("  "))
                    .isInstanceOf(BadRequestException.class);
        }
    }

    // ══ Le jeton ════════════════════════════════════════════════════════════

    @Nested
    @DisplayName("Vérification du jeton")
    class Jeton {

        @Test
        @DisplayName("refuse un jeton inconnu")
        void refuseInconnu() {
            when(remiseRepository.findByConvoyageJeton("inconnu")).thenReturn(Optional.empty());

            assertThatThrownBy(() -> service.vue("inconnu"))
                    .isInstanceOf(ResourceNotFoundException.class);
        }

        @Test
        @DisplayName("refuse un jeton expiré")
        void refuseExpire() {
            remise.setConvoyageJeton("jeton-valide");
            remise.setConvoyageExpireAt(LocalDateTime.now().minusDays(1));
            when(remiseRepository.findByConvoyageJeton("jeton-valide")).thenReturn(Optional.of(remise));

            assertThatThrownBy(() -> service.vue("jeton-valide"))
                    .isInstanceOf(ForbiddenException.class)
                    .hasMessageContaining("expiré");
        }

        @Test
        @DisplayName("refuse un jeton révoqué")
        void refuseRevoque() {
            service.revoquer(VENDEUR, REMISE);

            assertThat(remise.getConvoyageJeton()).isNull();
            assertThat(remise.getConvoyageExpireAt()).isNull();
        }
    }

    // ══ Ce que le convoyeur voit ════════════════════════════════════════════

    @Nested
    @DisplayName("La vue du convoyeur")
    class Vue {

        @BeforeEach
        void jetonActif() {
            remise.setConvoyageJeton("jeton-actif");
            remise.setConvoyageExpireAt(LocalDateTime.now().plusDays(7));
            when(remiseRepository.findByConvoyageJeton("jeton-actif")).thenReturn(Optional.of(remise));
        }

        @Test
        @DisplayName("donne ce qu'il faut pour livrer")
        void donneLEssentiel() {
            ConvoyageDTO vue = service.vue("jeton-actif");

            assertThat(vue.getAnimaux()).containsExactly("BOVIN");
            assertThat(vue.getLieuChargement()).isEqualTo("Korhogo");
            assertThat(vue.getAdresseLigne()).isEqualTo("Cocody Angré, 8e tranche");
            assertThat(vue.getAdresseIndications()).contains("Portail vert");
            // Il doit pouvoir appeler en arrivant.
            assertThat(vue.getDestinataireTelephone()).isEqualTo("+2250701020304");
            assertThat(vue.getArticleIds()).containsExactly(100L);
        }

        @Test
        @DisplayName("ne laisse fuir ni prix ni code de remise")
        void aucuneDonneeCommerciale() {
            ConvoyageDTO vue = service.vue("jeton-actif");

            // Le DTO n'expose aucun champ de prix ni de code : on le verifie sur
            // sa representation complete, pour attraper tout ajout futur.
            String rendu = vue.toString();
            assertThat(rendu).doesNotContain("4271");
            assertThat(rendu).doesNotContain("450000");
        }

        @Test
        @DisplayName("signale une livraison déjà terminée")
        void signaleLaFin() {
            bovin.setStatutLivraison(StatutLivraison.RECEPTIONNE);

            assertThat(service.vue("jeton-actif").isTermine()).isTrue();
        }
    }
}
