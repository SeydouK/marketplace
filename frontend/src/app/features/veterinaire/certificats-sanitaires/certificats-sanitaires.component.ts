import { Component, OnInit } from '@angular/core';
import { VeterinaireService, Certificate } from '../services/veterinaire.service';

// Représente une demande de validation groupée par animal/vendeur
export interface ValidationDemande {
  animalId: string;
  animalName: string;
  animalType: string;       // Bovin, Ovin, etc.
  sellerName: string;
  sellerEmail: string;
  documents: DocumentAValider[];
  status: 'EN_ATTENTE_VALIDATION' | 'VALIDE' | 'REFUSE';
}

export interface DocumentAValider {
  id: string;
  type: string;             // CERTIFICAT_VETERINAIRE, CARNET_VACCINATION, etc.
  label: string;
  fileUrl?: string;         // URL du fichier uploadé par le vendeur
  uploadedAt: string;
  status: 'PENDING' | 'VALID' | 'REFUSED';
}

@Component({
  selector: 'app-certificats-sanitaires',
  templateUrl: './certificats-sanitaires.component.html',
  standalone: false,
})
export class CertificatsSanitairesComponent implements OnInit {
  certificates: Certificate[] = [];
  showForm = false;

  // Demandes en attente de validation
  demandes: ValidationDemande[] = [];
  loadingDemandes = false;

  // Modal
  selectedDemande: ValidationDemande | null = null;
  isModalOpen = false;
  processingId: string | null = null;

  newCert: Partial<Certificate> = {
    animalId: undefined,
    type: '',
    expiresAt: '',
  };

  constructor(private vetService: VeterinaireService) {}

  ngOnInit(): void {
    this.loadDemandes();
    // this.vetService.getCertificates().subscribe((c) => (this.certificates = c));
  }

  loadDemandes(): void {
    this.loadingDemandes = true;
    // À brancher sur vetService.getValidationDemandes()
    // this.vetService.getValidationDemandes().subscribe({
    //   next: (d) => { this.demandes = d; this.loadingDemandes = false; },
    //   error: () => { this.loadingDemandes = false; }
    // });

    // Données mock pour le développement
    this.demandes = [
      {
        animalId: '00124',
        animalName: 'Bovin #00124 — Azawak',
        animalType: 'Bovin',
        sellerName: 'Kouassi Yao',
        sellerEmail: 'kouassi.yao@example.ci',
        status: 'EN_ATTENTE_VALIDATION',
        documents: [
          { id: 'd1', type: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire', fileUrl: '#', uploadedAt: '2025-05-10', status: 'PENDING' },
          { id: 'd2', type: 'CARNET_VACCINATION', label: 'Carnet de vaccination', fileUrl: '#', uploadedAt: '2025-05-10', status: 'PENDING' },
          { id: 'd3', type: 'ATTESTATION_ORIGINE', label: "Attestation d'origine", fileUrl: '#', uploadedAt: '2025-05-10', status: 'PENDING' },
        ],
      },
      {
        animalId: '00198',
        animalName: 'Ovin #00198 — Djallonké',
        animalType: 'Ovin',
        sellerName: 'Traoré Mamadou',
        sellerEmail: 'traore.m@example.ci',
        status: 'EN_ATTENTE_VALIDATION',
        documents: [
          { id: 'd4', type: 'CERTIFICAT_VETERINAIRE', label: 'Certificat vétérinaire', fileUrl: '#', uploadedAt: '2025-05-12', status: 'PENDING' },
          { id: 'd5', type: 'LAISSEZ_PASSER', label: 'Laissez-passer sanitaire', fileUrl: undefined, uploadedAt: '2025-05-12', status: 'PENDING' },
        ],
      },
    ];
    this.loadingDemandes = false;
  }

  openModal(demande: ValidationDemande): void {
    this.selectedDemande = { ...demande, documents: [...demande.documents] };
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDemande = null;
  }

  hasMissingDocuments(demande: ValidationDemande): boolean {
    return demande.documents.some(d => !d.fileUrl);
  }

  validerDemande(): void {
    if (!this.selectedDemande) return;
    const id = this.selectedDemande.animalId;
    const index = this.demandes.findIndex(d => d.animalId === id);
    if (index !== -1) this.demandes[index] = { ...this.demandes[index], status: 'VALIDE' };
    this.closeModal();
  }
  
  refuserDemande(): void {
    if (!this.selectedDemande) return;
    const id = this.selectedDemande.animalId;
    const index = this.demandes.findIndex(d => d.animalId === id);
    if (index !== -1) this.demandes[index] = { ...this.demandes[index], status: 'REFUSE' };
    this.closeModal();
  }

  submitCertificate(): void {
    this.vetService.issueCertificate(this.newCert).subscribe((cert) => {
      this.certificates.unshift(cert);
      this.showForm = false;
      this.newCert = { animalId: undefined, type: '', expiresAt: '' };
    });
  }
  

  getStatusDemandeBadge(status: string): string {
    const map: Record<string, string> = {
      EN_ATTENTE_VALIDATION: 'bg-amber-100 text-amber-800',
      VALIDE: 'bg-green-100 text-green-800',
      REFUSE: 'bg-red-100 text-red-800',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }

  getStatusDemandeLabel(status: string): string {
    const map: Record<string, string> = {
      EN_ATTENTE_VALIDATION: 'En attente',
      VALIDE: 'Validé',
      REFUSE: 'Refusé',
    };
    return map[status] ?? status;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      CERTIFICAT_VETERINAIRE: 'Certificat vétérinaire',
      CARNET_VACCINATION: 'Carnet de vaccination',
      LAISSEZ_PASSER: 'Laissez-passer sanitaire',
      CERTIFICAT_FERME: 'Certificat sanitaire de ferme',
      ATTESTATION_ORIGINE: "Attestation d'origine",
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

  getDocBadge(status: string): string {
    const map: Record<string, string> = {
      VALID: 'bg-green-100 text-green-800',
      REFUSED: 'bg-red-100 text-red-800',
      PENDING: 'bg-amber-100 text-amber-800',
    };
    return map[status] ?? 'bg-gray-100 text-gray-600';
  }

  trackByAnimalId(_: number, d: ValidationDemande): string {
    return d.animalId;
  }
}