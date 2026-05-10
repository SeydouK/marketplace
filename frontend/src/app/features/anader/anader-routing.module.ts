// features/anader/anader-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAnaderComponent } from './dashboard-anader/dashboard-anader.component';
import { AuthGuard } from '../../core/guards/auth.guard';

// Les routes ici sont relatives au préfixe déclaré dans app-routing.module.ts
// Ex: { path: 'anader', loadChildren: () => import('./features/anader/anader.module') }
// → /anader          redirige vers /anader/dashboard
// → /anader/dashboard  charge le dashboard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardAnaderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['AGENT_ANADER'] }
  },
  {
    path: 'statistiques',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnaderRoutingModule {}