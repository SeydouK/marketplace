package com.marketplace.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    /** Numéro de téléphone mobile (ex: "+225 07 00 00 00 00") */
    @Column(name = "phone", length = 20)
    private String phone;

    @Builder.Default
    @Column(nullable = false)
    private Boolean badgeVerifie = false;

    @Column(name = "email_verification_token")
    private String emailVerificationToken;

    @Column(name = "email_token_expires_at")
    private LocalDateTime emailTokenExpiresAt;

    @Builder.Default
    @Column(name = "email_verified")
    private boolean emailVerified = false;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus = KycStatus.PENDING;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ACHETEUR;

    @Builder.Default
    @Column(name = "devenir_vendeur", nullable = false)
    private boolean devenirVendeur = false;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    private String cniUrl;

    private String selfieUrl;

    /** Photo de profil (URL servie par /api/files) */
    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    /**
     * Dernier envoi de l'email de verification.
     *
     * Sert a espacer les renvois : sans cette trace, un clic repete sur
     * « renvoyer » ferait de la plateforme un outil d'envoi massif.
     */
    @Column(name = "verification_email_sent_at")
    private java.time.LocalDateTime verificationEmailSentAt;

    // ── Transporteur : au-dela du KYC, le permis de conduire ────────────────
    // Un transporteur n'est proposable aux vendeurs qu'une fois son permis
    // valide : c'est le signal minimal avant de lui confier un animal.

    @Column(name = "permis_url", columnDefinition = "text")
    private String permisUrl;

    @Column(name = "permis_valide", nullable = false)
    private boolean permisValide = false;

    @Column(name = "permis_valide_at")
    private java.time.LocalDateTime permisValideAt;

    @Column(name = "permis_valide_par_id")
    private Long permisValideParId;

    /** Nombre de tetes transportables — indicatif, affiche au vendeur. */
    @Column(name = "capacite_tetes")
    private Integer capaciteTetes;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_vehicule", length = 40)
    private TypeVehicule typeVehicule;

    
}