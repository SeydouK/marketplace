// admin/admin.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAnnoncesComponent } from './gestion-annonces/gestion-annonces.component';
import { GestionLitigesComponent } from './gestion-litiges/gestion-litiges.component';
import { GestionTransactionsComponent } from './gestion-transactions/gestion-transactions.component';
import { GestionVersementsComponent } from './gestion-versements/gestion-versements.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    GestionUtilisateursComponent,
    GestionAnnoncesComponent,
    GestionLitigesComponent,
    GestionTransactionsComponent,
    GestionVersementsComponent,
  ],
  imports: [SharedModule, AdminRoutingModule, RouterModule, FormsModule],
})
export class AdminModule {}
