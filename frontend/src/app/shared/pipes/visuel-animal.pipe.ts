// shared/pipes/visuel-animal.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const ESPECES = ['bovin', 'ovin', 'caprin', 'porcin', 'avicole'];

/**
 * Vignette illustrée de l'espèce, pour une annonce sans vraie photo.
 *
 * `assets/images/especes/<espece>.svg` : un fond teinté et la silhouette de
 * l'animal, dans la charte. Remplace les images de remplacement textuelles
 * (« Boeuf », « Animal » sur fond beige) qu'affichait placehold.co.
 */
export function visuelEspece(espece?: string | null): string {
  const cle = (espece ?? '').toLowerCase();
  return `assets/images/especes/${ESPECES.includes(cle) ? cle : 'autre'}.svg`;
}

/**
 * Une image d'annonce, ou à défaut la vignette de son espèce.
 *
 * Une URL placehold.co compte comme une absence de photo : les annonces de
 * démonstration en portent, et ce texte sur fond uni n'est pas une photo.
 *
 * Usage : `listing.image | visuelAnimal : listing.animalType`
 */
@Pipe({ name: 'visuelAnimal', standalone: true })
export class VisuelAnimalPipe implements PipeTransform {
  transform(url?: string | null, espece?: string | null): string {
    if (!url || /placehold\.co/i.test(url)) return visuelEspece(espece);
    return url;
  }
}
