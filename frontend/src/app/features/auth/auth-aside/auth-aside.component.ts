// features/auth/auth-aside/auth-aside.component.ts
import { Component, Input } from '@angular/core';

/**
 * Panneau de marque des écrans d'authentification (ordinateur uniquement).
 *
 * Partagé par la connexion, l'inscription et le parcours « mot de passe
 * oublié » : un seul endroit à faire évoluer pour que ces écrans restent
 * identiques.
 */
@Component({
  selector: 'app-auth-aside',
  templateUrl: './auth-aside.component.html',
  // L'hôte s'efface : c'est l'<aside> qui occupe la colonne de la grille et en
  // prend toute la hauteur.
  styles: [':host { display: contents; }'],
  standalone: false,
})
export class AuthAsideComponent {
  @Input() titre = 'La place de marché de confiance pour l\'élevage';
  @Input() points: string[] = [
    'Vendeurs à l\'identité vérifiée',
    'Animaux contrôlés par un vétérinaire',
    'Paiement bloqué jusqu\'à la remise de l\'animal',
  ];
}
