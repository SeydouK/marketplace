package com.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Article publie dans l'onglet Actualites.
 *
 * Le contenu vivait jusqu'ici dans un tableau code en dur cote front : publier
 * demandait un deploiement, et une alerte sanitaire qui attend un deploiement
 * n'est plus une alerte. La table rend la redaction administrable.
 *
 * Deux dates distinctes, et ce n'est pas une redondance : {@code createdAt} dit
 * quand la ligne est apparue en base, {@code datePublication} dit la date que
 * le lecteur voit. Un article peut etre redige le lundi pour une annonce datee
 * du mercredi, et un brouillon repris trois semaines plus tard ne doit pas
 * remonter en tete de liste comme s'il etait frais.
 */
@Entity
@Table(name = "actualites")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Actualite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre", nullable = false)
    private String titre;

    /** Chapeau affiche dans la liste : l'article n'est jamais lu en entier depuis la liste. */
    @Column(name = "resume", nullable = false, columnDefinition = "text")
    private String resume;

    @Column(name = "contenu", nullable = false, columnDefinition = "text")
    private String contenu;

    @Enumerated(EnumType.STRING)
    @Column(name = "categorie", nullable = false)
    private ActualiteCategorie categorie;

    @Column(name = "image_url")
    private String imageUrl;

    /**
     * Signature affichee, saisie librement.
     *
     * Pas une jointure vers {@link User} a dessein : un article peut etre signe
     * « ANADER Cote d'Ivoire » ou « Dr Kouame Yao, Veterinaire » sans que ces
     * signataires aient un compte sur la plateforme. La tracabilite interne est
     * assuree separement par {@code redigeParId}.
     */
    @Column(name = "auteur", nullable = false)
    private String auteur;

    /** Administrateur a l'origine de l'article, pour savoir a qui s'adresser. */
    @Column(name = "redige_par_id")
    private Long redigeParId;

    @Column(name = "date_publication", nullable = false)
    private LocalDateTime datePublication;

    /**
     * Un brouillon reste invisible du public quelle que soit sa date.
     *
     * Necessaire pour rediger a plusieurs mains une annonce reglementaire sans
     * qu'une version intermediaire parte en ligne.
     */
    @Column(name = "publiee", nullable = false)
    private boolean publiee = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
