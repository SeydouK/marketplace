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

    
}