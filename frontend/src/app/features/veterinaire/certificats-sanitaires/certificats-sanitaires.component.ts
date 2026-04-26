// veterinaire/certificats-sanitaires/certificats-sanitaires.component.ts
import { Component, OnInit } from '@angular/core';
import { VeterinaireService, Certificate } from '../services/veterinaire.service';

@Component({
  selector: 'app-certificats-sanitaires',
  templateUrl: './certificats-sanitaires.component.html',
  standalone: false,
})
export class CertificatsSanitairesComponent implements OnInit {
  certificates: Certificate[] = [];
  showForm = false;

  newCert: Partial<Certificate> = {
    animalId: undefined,
    type: '',
    expiresAt: '',
  };

  constructor(private vetService: VeterinaireService) {}

  ngOnInit(): void {
   /* this.vetService.getCertificates().subscribe((c) => (this.certificates = c));*/
  }

  submitCertificate(): void {
    this.vetService.issueCertificate(this.newCert).subscribe((cert) => {
      this.certificates.unshift(cert);
      this.showForm = false;
      this.newCert = { animalId: undefined, type: '', expiresAt: '' };
    });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      CERTIFICAT_VETERINAIRE: 'Certificat vétérinaire',
      CARNET_VACCINATION: 'Carnet de vaccination',
      LAISSEZ_PASSER: 'Laissez-passer sanitaire',
      CERTIFICAT_FERME: 'Certificat sanitaire de ferme',
    };
    return labels[type] ?? type;
  }

  getCertBadge(status: string): string {
    const map: Record<string, string> = {
      VALID: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-red-100 text-red-800',
      PENDING: 'bg-amber-100 text-amber-800',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }
}
