import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { UserStatusService } from '../../core/services/user-status.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  standalone: false,
})
export class KycComponent {
  step: 'cni' | 'selfie' | 'result' = 'cni';
  kycStatus: 'success' | 'rejected' | null = null;
  message = '';
  loading = false;

  // CNI
  cniFile: File | null = null;
  cniPreview: string | null = null;

  // Selfie
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasEl') canvasEl!: ElementRef<HTMLCanvasElement>;
  stream: MediaStream | null = null;
  selfieFile: File | null = null;
  selfiePreview: string | null = null;
  cameraActive = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private storage: StorageService,
    private userStatusService: UserStatusService
  ) {}

  // --- ÉTAPE 1 : CNI ---

  onCniSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.cniFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.cniPreview = e.target?.result as string;
    reader.readAsDataURL(this.cniFile);
  }

  submitCni(): void {
    if (!this.cniFile) return;
    this.loading = true;
  
    const formData = new FormData();
    formData.append('file', this.cniFile);
    const token = this.storage.getToken();
  
    this.http.post<any>('/api/kyc/upload-cni', formData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
      next: (res) => {
        this.loading = false;
  
        if (res.kycStatus === 'CNI_VERIFIED') {
          // CNI validée → passer à l'étape selfie
          this.toast.success('CNI vérifiée !');
          this.step = 'selfie';
  
        } else if (res.kycStatus === 'REJECTED') {
          // CNI rejetée → afficher l'erreur
          this.kycStatus = 'rejected';
          this.message = res.message;
          this.step = 'result';
  
        } else {
          // Cas inattendu
          this.kycStatus = 'rejected';
          this.message = res.message;
          this.step = 'result';
        }
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || 'Erreur lors de la vérification CNI');
      }
    });
  }

  // --- ÉTAPE 2 : SELFIE ---

  async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.cameraActive = true;
      setTimeout(() => {
        this.videoEl.nativeElement.srcObject = this.stream;
      }, 100);
    } catch (error: any) {
      // Affiche l'erreur précise dans la console
      console.error('Erreur caméra:', error.name, error.message);
  
      if (error.name === 'NotAllowedError') {
        this.toast.error('Permission caméra refusée. Autorisez la caméra dans les paramètres du navigateur.');
      } else if (error.name === 'NotFoundError') {
        this.toast.error('Aucune caméra détectée sur cet appareil.');
      } else if (error.name === 'NotReadableError') {
        this.toast.error('Caméra déjà utilisée par une autre application.');
      } else {
        this.toast.error('Impossible d\'accéder à la caméra : ' + error.message);
      }
    }
  }

  captureSelfie(): void {
    const video = this.videoEl.nativeElement;
    const canvas = this.canvasEl.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    this.selfiePreview = canvas.toDataURL('image/jpeg');

    // Convertir en File
    canvas.toBlob((blob) => {
      if (blob) this.selfieFile = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
    }, 'image/jpeg');

    // Stopper la caméra
    this.stream?.getTracks().forEach(t => t.stop());
    this.cameraActive = false;
  }

  resetSelfie(): void {
    this.selfiePreview = null;
    this.selfieFile = null;
  }

  submitSelfie(): void {
    if (!this.selfieFile) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.selfieFile);
    const token = this.storage.getToken();

    this.http.post<any>('/api/kyc/upload-selfie', formData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.kycStatus = res.kycStatus === 'VALIDATED' ? 'success' : 'rejected';
        this.message = res.message;
        this.step = 'result'; 
  
        if (res.kycStatus === 'VALIDATED') {
          this.userStatusService.update({
            kycStatus: 'VALIDATED',
            emailVerified: true,
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || 'Erreur lors de la vérification du selfie');
      }
    });
  }

  onSelfieSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selfieFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.selfiePreview = e.target?.result as string;
    reader.readAsDataURL(this.selfieFile);
    this.cameraActive = false;
  }

  // --- ÉTAPE 3 : RÉSULTAT ---

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  retry(): void {
    this.step = 'cni';
    this.kycStatus = null;
    this.cniFile = null;
    this.cniPreview = null;
    this.selfieFile = null;
    this.selfiePreview = null;
    this.message = '';
  }
}