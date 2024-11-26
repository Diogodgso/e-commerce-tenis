import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root', // Disponível em todo o app
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Usuário autenticado, permite acesso
    } else {
      this.router.navigate(['/login']); // Redireciona para login se não autenticado
      return false;
    }
  }
}
