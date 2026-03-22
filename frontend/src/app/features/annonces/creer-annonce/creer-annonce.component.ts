import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.css'],
  standalone: false,
})
export class CreerAnnonceComponent {
  submitted = false;

  readonly statuses = ['DISPONIBLE', 'RESERVE', 'VENDU'];
  readonly animalTypes = ['mouton', 'boeuf', 'poulet', 'porc', 'chevre'];
  readonly cities = ['Abidjan', 'Bouak\u00E9', 'Korhogo', 'Ferkess\u00E9dougou', 'Yamoussoukro'];

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    animalType: ['mouton', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    location: ['Abidjan', Validators.required],
    sellerName: [''],
    sellerPhone: ['', Validators.required],
    image: [''],
    ageMonths: [null as number | null],
    breed: [''],
    status: ['DISPONIBLE'],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly listingService: ListingService,
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly auth: AuthService
  ) {
    this.form.patchValue({
      sellerName: this.auth.currentUser?.name ?? '',
    });
  }

  controlInvalid(controlName: string, errorName?: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    const shouldShow = control.invalid && (control.touched || control.dirty || this.submitted);
    return shouldShow && (!errorName || control.hasError(errorName));
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as any;
    this.listingService.create(payload).subscribe((listing) => {
      this.toast.success('Annonce creee');
      this.router.navigate(['/annonces', listing.id]);
    });
  }
}
