import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { ProfilVendeurService } from './profil-vendeur.service';
import { ProfilVendeur } from './profil-vendeur.model';
import { Listing } from '../annonces/models/listing.model';

type SortOrder = 'recent' | 'ancien';

@Component({
    selector: 'app-profil-vendeur',
    templateUrl: './profil-vendeur.component.html',
    standalone: false,
})
export class ProfilVendeurComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    profil: ProfilVendeur | null = null;
    annonces: Listing[] = [];
    loading = true;
    error = false;

    sortOrder: SortOrder = 'recent';

    constructor(
        private route: ActivatedRoute,
        private svc: ProfilVendeurService,
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
        forkJoin({
            profil: this.svc.getProfil(id),
            annonces: this.svc.getAnnonces(id),
        })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: ({ profil, annonces }) => {
                    this.profil = profil;
                    this.annonces = annonces;
                    this.loading = false;
                },
                error: () => {
                    this.error = true;
                    this.loading = false;
                },
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get annoncesTriees(): Listing[] {
        return [...this.annonces].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return this.sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
        });
    }

    toggleSort(): void {
        this.sortOrder = this.sortOrder === 'recent' ? 'ancien' : 'recent';
    }

    get membreDepuis(): string {
        if (!this.profil) return '';
        const d = new Date(this.profil.dateInscription);
        return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    }
}
