import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinhacontaPage } from './minhaconta.page';
import { AuthGuard } from '../auth/auth.guard';  // Importe o AuthGuard

const routes: Routes = [
  {
    path: '',
    component: MinhacontaPage,
    canActivate: [AuthGuard],  // Adicione o AuthGuard para proteger a rota
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhacontaPageRoutingModule {}
