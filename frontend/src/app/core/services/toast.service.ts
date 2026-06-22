import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(detail: string, summary = 'Succès') {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  error(detail: string, summary = 'Erreur') {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  info(detail: string, summary = 'Info') {
    this.messageService.add({ severity: 'info', summary, detail });
  }
}
