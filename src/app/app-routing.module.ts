import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: AuthComponent, title: 'dNotes'},
  {path: 'dashboard', component: DashboardComponent, title: 'dNotes Dashboard'},
  // {path: '', component: DashboardComponent, title: 'dNotes Dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
