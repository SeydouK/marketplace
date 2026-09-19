package com.marketplace.dto;

import com.marketplace.model.ActualiteCategorie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Vue de liste, amputee du corps de l'article.
 *
 * La liste est chargee des l'ouverture de l'application — l'en-tete en depend
 * pour sa pastille — alors que le corps n'est lu que pour un article a la fois.
 * Le transporter pour tous serait payer, a chaque visite, une lecture qui
 * n'arrivera pas.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualiteResumeDTO {
    private Long id;
    private String titre;
    private String resume;
    private ActualiteCategorie categorie;
    private String imageUrl;
    private String auteur;
    private LocalDateTime datePublication;
}
