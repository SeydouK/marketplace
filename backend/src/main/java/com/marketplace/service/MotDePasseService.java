package com.marketplace.service;

import com.marketplace.exception.BadRequestException;
import com.marketplace.model.User;
import com.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

/**
 * Mot de passe oublie : demande d'un lien, puis choix d'un nouveau mot de passe.
 *
 * <p>Trois principes :
 * <ul>
 *   <li><strong>Le jeton n'est jamais stocke en clair.</strong> Seule son empreinte
 *       SHA-256 l'est ; le jeton n'existe en clair que dans l'email. Une fuite de
 *       la base ne suffit donc pas a prendre la main sur un compte.</li>
 *   <li><strong>La demande ne dit rien de l'existence du compte.</strong> La
 *       reponse est identique que l'adresse soit connue ou non.</li>
 *   <li><strong>Changer de mot de passe deconnecte partout.</strong> Les jetons de
 *       session emis avant le changement sont refuses — cf.
 *       {@link #sessionToujoursValide}.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
public class MotDePasseService {

    private static final Logger log = LoggerFactory.getLogger(MotDePasseService.class);

    /**
     * Duree de vie d'un lien.
     *
     * Une heure : assez pour aller lire ses emails et revenir, assez court pour
     * qu'un lien retrouve plus tard dans une boite compromise ne serve plus.
     */
    static final long DUREE_VALIDITE_MINUTES = 60;

    /**
     * Ecart minimal entre deux envois pour un meme compte.
     *
     * Sans lui, la route — ouverte, puisque l'utilisateur ne peut plus se
     * connecter — servirait a inonder une boite de messages. Les demandes trop
     * rapprochees sont ignorees en silence : l'appelant ne doit pas pouvoir
     * distinguer « ignoree » de « envoyee ».
     */
    private static final Duration ECART_MIN_ENTRE_ENVOIS = Duration.ofMinutes(2);

    /** Aligne sur l'inscription : un ecart des deux regles serait incomprehensible. */
    static final int LONGUEUR_MIN_MOT_DE_PASSE = 6;

    /** 32 octets : un jeton qui ouvre un compte doit etre hors de portee du hasard. */
    private static final int OCTETS_JETON = 32;

    private static final SecureRandom ALEA = new SecureRandom();

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // ══ Demande ═════════════════════════════════════════════════════════════

    /**
     * Envoie un lien de reinitialisation si l'adresse correspond a un compte.
     *
     * Ne leve jamais d'exception liee au compte : l'absence de compte, ou une
     * demande trop rapprochee, produisent le meme resultat visible qu'un envoi.
     */
    @Transactional
    public void demander(String email) {
        if (email == null || email.isBlank()) return;

        User user = userRepository.findByEmail(email.trim()).orElse(null);
        if (user == null) {
            log.info("Demande de reinitialisation pour une adresse inconnue : aucune action.");
            return;
        }

        LocalDateTime maintenant = LocalDateTime.now();
        LocalDateTime derniere = user.getReinitialisationDemandeeAt();
        if (derniere != null && derniere.plus(ECART_MIN_ENTRE_ENVOIS).isAfter(maintenant)) {
            log.info("Demande de reinitialisation trop rapprochee pour le compte {} : ignoree.", user.getId());
            return;
        }

        // Une nouvelle demande remplace la precedente : le dernier lien recu est
        // le seul valable, comme pour la verification d'adresse.
        String jeton = genererJeton();
        user.setReinitialisationJetonHash(empreinte(jeton));
        user.setReinitialisationExpireAt(maintenant.plusMinutes(DUREE_VALIDITE_MINUTES));
        user.setReinitialisationDemandeeAt(maintenant);
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), prenom(user), jeton, DUREE_VALIDITE_MINUTES);
        log.info("Lien de reinitialisation emis pour le compte {}.", user.getId());
    }

    // ══ Verification ════════════════════════════════════════════════════════

    /**
     * Le lien est-il encore utilisable ?
     *
     * Permet au front d'annoncer un lien expire des l'ouverture de la page, plutot
     * qu'apres que l'utilisateur a saisi deux fois son nouveau mot de passe.
     */
    @Transactional(readOnly = true)
    public boolean jetonValide(String jeton) {
        return trouverParJeton(jeton) != null;
    }

    // ══ Reinitialisation ════════════════════════════════════════════════════

    @Transactional
    public void reinitialiser(String jeton, String nouveauMotDePasse) {
        if (nouveauMotDePasse == null || nouveauMotDePasse.length() < LONGUEUR_MIN_MOT_DE_PASSE) {
            throw new BadRequestException(
                    "Le mot de passe doit contenir au moins " + LONGUEUR_MIN_MOT_DE_PASSE + " caracteres.");
        }

        User user = trouverParJeton(jeton);
        if (user == null) {
            throw new BadRequestException(
                    "Ce lien n'est plus valable. Demandez-en un nouveau depuis la page de connexion.");
        }

        LocalDateTime maintenant = LocalDateTime.now();
        user.setPassword(passwordEncoder.encode(nouveauMotDePasse));
        user.setMotDePasseModifieAt(maintenant);

        // Usage unique : le lien meurt avec son premier emploi.
        user.setReinitialisationJetonHash(null);
        user.setReinitialisationExpireAt(null);

        // Le lien est arrive dans cette boite et y a ete ouvert : l'adresse est
        // donc prouvee, au meme titre qu'avec le lien de verification.
        if (!user.isEmailVerified()) {
            user.setEmailVerified(true);
            user.setEmailVerificationToken(null);
            user.setEmailTokenExpiresAt(null);
        }

        userRepository.save(user);
        emailService.sendPasswordChangedEmail(user.getEmail(), prenom(user));
        log.info("Mot de passe reinitialise pour le compte {} : sessions anterieures revoquees.", user.getId());
    }

    // ══ Revocation des sessions ═════════════════════════════════════════════

    /**
     * Une session emise a {@code emiseLe} reste-t-elle valable pour ce compte ?
     *
     * Comparaison a la seconde : la date d'emission d'un jeton JWT n'a pas de
     * precision plus fine. Un jeton emis dans la seconde meme du changement est
     * donc admis — c'est celui de la reconnexion qui suit, et la fenetre est trop
     * etroite pour profiter a un tiers.
     */
    public static boolean sessionToujoursValide(User user, java.util.Date emiseLe) {
        LocalDateTime modifie = user.getMotDePasseModifieAt();
        if (modifie == null || emiseLe == null) return true;

        long emissionSecondes = emiseLe.toInstant().getEpochSecond();
        long changementSecondes = modifie.atZone(java.time.ZoneId.systemDefault()).toEpochSecond();
        return emissionSecondes >= changementSecondes;
    }

    // ══ Interne ═════════════════════════════════════════════════════════════

    private User trouverParJeton(String jeton) {
        if (jeton == null || jeton.isBlank()) return null;

        User user = userRepository.findByReinitialisationJetonHash(empreinte(jeton.trim())).orElse(null);
        if (user == null) return null;

        LocalDateTime expire = user.getReinitialisationExpireAt();
        if (expire == null || LocalDateTime.now().isAfter(expire)) return null;
        return user;
    }

    private String genererJeton() {
        byte[] octets = new byte[OCTETS_JETON];
        ALEA.nextBytes(octets);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(octets);
    }

    /**
     * Empreinte SHA-256, en hexadecimal.
     *
     * Un hachage rapide suffit ici, contrairement aux mots de passe : le jeton
     * porte 256 bits d'aleatoire, il n'y a rien a deviner par force brute.
     */
    private static String empreinte(String jeton) {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(sha.digest(jeton.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 indisponible", e);
        }
    }

    private static String prenom(User user) {
        return user.getName() != null && !user.getName().isBlank() ? user.getName() : "";
    }
}
