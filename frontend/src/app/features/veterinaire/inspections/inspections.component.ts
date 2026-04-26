// veterinaire/inspections/inspections.component.ts
import { Component, OnInit } from '@angular/core';
import { VeterinaireService } from '../services/veterinaire.service';

export interface Inspection {
  id: number;
  farmerName: string;
  zone: string;
  address: string;
  animalsCount: number;
  requestedAt: string;
  scheduledAt?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  isUrgent: boolean;
  requiredDocs: string[];
}

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  standalone: false,
})
export class InspectionsComponent implements OnInit {
  inspections: Inspection[] = [];

  constructor(private vetService: VeterinaireService) {}

  ngOnInit(): void {
   /* this.vetService.getInspections().subscribe((data) => {
      this.inspections = data as Inspection[];
    });*/
  }

  startInspection(insp: Inspection): void {
    insp.status = 'IN_PROGRESS';
    // TODO: appel API PATCH /veterinaire/inspections/:id/demarrer
  }
}
