import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-mes-animaux',
  templateUrl: './mes-animaux.component.html',
  styleUrls: ['./mes-animaux.component.css'],
  standalone: false,
})
export class MesAnimauxComponent implements OnInit {
  animals: Animal[] = [];
  loading = true;

  constructor(
    private readonly animalService: AnimalService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.animalService.mine().subscribe({
      next: (animals) => {
        this.animals = animals;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  coverOf(animal: Animal): string {
    return animal.photos[0] || 'https://placehold.co/1200x900/e8ddcf/6a4a2f?text=Betail';
  }

  get pendingCount(): number {
    return this.animals.filter((animal) => animal.status === 'INDISPONIBLE').length;
  }

  get availableCount(): number {
    return this.animals.filter((animal) => animal.status === 'DISPONIBLE').length;
  }

  get canAccessHealthValidation(): boolean {
    return this.auth.canAccessHealthValidation;
  }

  healthStateLabel(animal: Animal): string {
    const latestRecord = animal.healthRecords[0];
    if (!latestRecord) {
      return 'Aucun document sanitaire';
    }

    return latestRecord.validationStatus.replace(/_/g, ' ');
  }
}
