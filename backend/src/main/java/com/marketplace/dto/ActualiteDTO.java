package com.marketplace.dto;

import com.marketplace.model.ActualiteCategorie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Article complet : lecture du detail cote public, et toute la surface
 * d'administration.
 *
 * {@code publiee} n'a de sens que pour l'administration, mais le champ ne
 * trahit rien : le detail public n'est servi que pour un article deja publie,
 * ou il vaut invariablement vrai.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualiteDTO {
    private Long id;
    private String titre;
    private String resume;
    private String contenu;
    private ActualiteCategorie categorie;
    private String imageUrl;
    private String auteur;
    private LocalDateTime datePublication;
    private boolean publiee;
    private LocalDateTime updatedAt;
}
