import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { UserStatusService } from '../../core/services/user-status.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  standalone: false,
})
export class KycComponent implements OnDestroy {
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
  private cniPreviewObjectUrl: string | null = null;
  private selfiePreviewObjectUrl: string | null = null;

  // NOTE: HttpHeaders + token retiré — l'AuthInterceptor s'en charge globalement.
  // StorageService n'est plus nécessaire ici.
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private userStatusService: UserStatusService
  ) {}

  // ─── ÉTAPE 1 : CNI ───────────────────────────────────────────

  onCniSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.revokeObjectUrl(this.cniPreviewObjectUrl);
    this.cniFile = file;
    this.cniPreviewObjectUrl = URL.createObjectURL(file);
    this.cniPreview = this.cniPreviewObjectUrl;
    input.value = '';
  }

  submitCni(): void {
    if (!this.cniFile) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.cniFile);

    this.http.post<any>('/api/kyc/upload-cni', formData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.kycStatus === 'CNI_VERIFIED') {
          this.toast.success('CNI vérifiée !');
          this.step = 'selfie';
        } else {
          this.kycStatus = 'rejected';
          this.message = res.message;
          this.step = 'result';
        }
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || 'Erreur lors de la vérification CNI');
      },
    });
  }

  // ─── ÉTAPE 2 : SELFIE ────────────────────────────────────────

  async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.cameraActive = true;
      setTimeout(() => {
        this.videoEl.nativeElement.srcObject = this.stream;
      }, 100);
    } catch (error: any) {
      console.error('Erreur caméra:', error.name, error.message);
      const messages: Record<string, string> = {
        NotAllowedError:  'Permission caméra refusée. Autorisez-la dans les paramètres du navigateur.',
        NotFoundError:    'Aucune caméra détectée sur cet appareil.',
        NotReadableError: 'Caméra déjà utilisée par une autre application.',
      };
      this.toast.error(messages[error.name] ?? `Impossible d'accéder à la caméra : ${error.message}`);
    }
  }

  captureSelfie(): void {
    const video = this.videoEl.nativeElement;
    const canvas = this.canvasEl.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    this.revokeObjectUrl(this.selfiePreviewObjectUrl);
    this.selfiePreviewObjectUrl = null;
    this.selfiePreview = canvas.toDataURL('image/jpeg');
    canvas.toBlob((blob) => {
      if (blob) this.selfieFile = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
    }, 'image/jpeg');
    this.stream?.getTracks().forEach((t) => t.stop());
    this.cameraActive = false;
  }

  resetSelfie(): void {
    this.revokeObjectUrl(this.selfiePreviewObjectUrl);
    this.selfiePreviewObjectUrl = null;
    this.selfiePreview = null;
    this.selfieFile = null;
  }

  onSelfieSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.revokeObjectUrl(this.selfiePreviewObjectUrl);
    this.selfieFile = file;
    this.selfiePreviewObjectUrl = URL.createObjectURL(file);
    this.selfiePreview = this.selfiePreviewObjectUrl;
    this.cameraActive = false;
    input.value = '';
  }

  submitSelfie(): void {
    if (!this.selfieFile) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.selfieFile);

    this.http.post<any>('/api/kyc/upload-selfie', formData).subscribe({
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
      },
    });
  }

  // ─── ÉTAPE 3 : RÉSULTAT ──────────────────────────────────────

  goToProfile(): void {
    this.router.navigate(['/profil']);
  }

  retry(): void {
    this.step = 'cni';
    this.kycStatus = null;
    this.revokeObjectUrl(this.cniPreviewObjectUrl);
    this.revokeObjectUrl(this.selfiePreviewObjectUrl);
    this.cniPreviewObjectUrl = null;
    this.selfiePreviewObjectUrl = null;
    this.cniFile = null;
    this.cniPreview = null;
    this.selfieFile = null;
    this.selfiePreview = null;
    this.message = '';
  }

  ngOnDestroy(): void {
    this.revokeObjectUrl(this.cniPreviewObjectUrl);
    this.revokeObjectUrl(this.selfiePreviewObjectUrl);
  }

  private revokeObjectUrl(url: string | null): void {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
}
