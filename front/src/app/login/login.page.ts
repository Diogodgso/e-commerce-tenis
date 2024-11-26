import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';
  isLoading: boolean = false; // Indicador de carregamento
  password: any;

  constructor(private toastController: ToastController, private router: Router) { }

  ngOnInit() { }

  async login() {
    if (!this.email || !this.senha) {
      await this.presentToast('Por favor, preencha todos os campos.', 'danger');
      return;
    }

    this.isLoading = true; // Mostra indicador de carregamento

    try {
      const response = await fetch(`${environment.api_url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.senha,
        }),
      });

      this.isLoading = false; // Oculta indicador de carregamento

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Armazena o token no localStorage
        await this.presentToast('Login bem-sucedido!', 'success');
        this.router.navigate(['/catalogo']); // Redireciona para a página do catálogo
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Erro no login. Verifique suas credenciais.';
        await this.presentToast(errorMessage, 'danger');
      }
    } catch (error) {
      this.isLoading = false;
      console.error('Erro ao fazer login:', error);
      await this.presentToast('Erro de conexão com o servidor. Tente novamente.', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  navigateToNovaPagina() {
    this.router.navigate(['/cadastro']);
  }
}
