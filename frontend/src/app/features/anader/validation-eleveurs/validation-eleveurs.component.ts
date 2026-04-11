// anader/validation-eleveurs/validation-eleveurs.component.ts
import { Component, OnInit } from '@angular/core';
import { AnaderService, FarmerValidation } from '../services/anader.service';

@Component({
  selector: 'app-validation-eleveurs',
  templateUrl: './validation-eleveurs.component.html',
  standalone: false,
})
export class ValidationEleveursComponent implements OnInit {
  farmers: FarmerValidation[] = [];

  constructor(private anaderService: AnaderService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.anaderService.getPendingFarmers().subscribe((f) => (this.farmers = f));
  }

  validate(farmer: FarmerValidation): void {
    this.anaderService.validateFarmer(farmer.id).subscribe(() => this.load());
  }

  reject(farmer: FarmerValidation): void {
    const reason = prompt('Motif du rejet :');
    if (!reason) return;
    this.anaderService.rejectFarmer(farmer.id, reason).subscribe(() => this.load());
  }
}
