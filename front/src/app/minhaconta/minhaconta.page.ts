import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  infoUsuario = {
    cpf: '',
    email: '',
    nome: '',
    telefone: ''
  };

  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient // Injeta o serviço HttpClient
  ) {
    this.addressForm = this.formBuilder.group({
      Rua: ['', [Validators.required, Validators.minLength(5)]],
      Cidade: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', Validators.required],
      CEP: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]]
    });
  }

  ngOnInit() {
    this.buscarDadosUsuario(); // Busca os dados do usuário ao iniciar
  }

  // Função para buscar dados do usuário no backend
  buscarDadosUsuario() {
    const usuarioLogado = localStorage.getItem('userId'); // Recupera o ID do usuário logado
    if (usuarioLogado) {
      this.http.get<any>(`http://localhost:3000/api/usuarios/${usuarioLogado}`).subscribe(
        (response) => {
          this.infoUsuario = {
            cpf: response.cpf,
            email: response.email,
            nome: response.nome,
            telefone: response.telefone
          };
        },
        (error) => {
          console.error('Erro ao buscar dados do usuário:', error);
          this.presentToast('Erro ao carregar dados do usuário.', 'danger');
        }
      );
    } else {
      this.presentToast('Usuário não está logado.', 'warning');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const enderecos = JSON.parse(localStorage.getItem('enderecos') || '[]');
      const usuarioLogado = localStorage.getItem('userId');
      const enderecoExistente = enderecos.find((endereco: any) => endereco.userId === usuarioLogado);

      const novoEndereco = {
        userId: usuarioLogado,
        Rua: this.addressForm.value.Rua,
        Cidade: this.addressForm.value.Cidade,
        Estado: this.addressForm.value.Estado,
        CEP: this.addressForm.value.CEP
      };

      if (!this.validateCEP(this.addressForm.value.CEP)) {
        this.presentToast('CEP inválido, Verifique e tente novamente.', 'danger');
        return;
      }

      if (enderecoExistente) {
        enderecoExistente.Rua = novoEndereco.Rua;
        enderecoExistente.Cidade = novoEndereco.Cidade;
        enderecoExistente.Estado = novoEndereco.Estado;
        enderecoExistente.CEP = novoEndereco.CEP;
      } else {
        enderecos.push(novoEndereco);
      }

      localStorage.setItem('enderecos', JSON.stringify(enderecos));
      this.presentToast('Endereço cadastrado com sucesso!', 'success');
    } else {
      this.presentToast('Por favor, preencha todos os campos corretamente.', 'danger');
    }
  }

  sairConta() {
    this.infoUsuario = {
      cpf: '',
      email: '',
      nome: '',
      telefone: ''
    };

    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  validateCEP(CEP: string): boolean {
    CEP = CEP.replace(/\D/g, '');
    return CEP.length === 8;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}
