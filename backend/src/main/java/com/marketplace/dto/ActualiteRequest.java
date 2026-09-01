package com.marketplace.dto;

import com.marketplace.model.ActualiteCategorie;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

/** Charge utile de creation et de mise a jour d'un article. */
@Data
public class ActualiteRequest {

    @NotBlank(message = "Le titre est obligatoire.")
    @Size(max = 255, message = "Le titre ne peut pas depasser 255 caracteres.")
    private String titre;

    @NotBlank(message = "Le resume est obligatoire.")
    @Size(max = 600, message = "Le resume ne peut pas depasser 600 caracteres.")
    private String resume;

    @NotBlank(message = "Le contenu est obligatoire.")
    private String contenu;

    @NotNull(message = "La rubrique est obligatoire.")
    private ActualiteCategorie categorie;

    private String imageUrl;

    @NotBlank(message = "La signature est obligatoire.")
    @Size(max = 255, message = "La signature ne peut pas depasser 255 caracteres.")
    private String auteur;

    /** Laissee vide, le service prend l'instant courant. */
    private LocalDateTime datePublication;

    /** Absent vaut brouillon : rien ne part en ligne par inadvertance. */
    private Boolean publiee;
}
