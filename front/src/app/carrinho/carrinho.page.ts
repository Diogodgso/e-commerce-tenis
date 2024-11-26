import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CartItem } from '../service/cart-item.model';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  cart: CartItem[] = []; // Renomeado para 'cart' para corresponder ao template
  navCtrl: any;
  router: any;
  subscription: any;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.subscription = this.carrinhoService.getCart().subscribe((items) => {
      this.cart = items;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // Método para voltar à página anterior
  voltar() {
    this.router.navigate(['/catalogo']); // Navega para a página desejada
  }

  // Diminuir quantidade de um item no carrinho
  diminuirQuant(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--; // Diminui a quantidade
      this.carrinhoService.updateCart(item); // Atualiza o item no serviço
    }
  }

  // Aumentar quantidade de um item no carrinho
  aumentarQuant(item: CartItem) {
    item.quantity++; // Aumenta a quantidade
    this.carrinhoService.updateCart(item); // Atualiza o item no serviço
  }

  // Remover item do carrinho
  removerCarrinho(item: CartItem) {
    this.carrinhoService.removerCarrinho(item); // Usa o método removerCarrinho do serviço
  }

  // Limpar o carrinho
  clearCart() {
    this.carrinhoService.clearCart(); // Limpa o carrinho usando o método do serviço
  }

  // Obter o total de itens no carrinho
  getTotal() {
    return this.cart.reduce((total, item) => total + item.valor * item.quantity, 0);
  }
  // Finalizar o carrinho (você pode adicionar lógica adicional aqui)
  finalizar() {
    this.router.navigate(['/checkout']); // Navega para a página de checkout
    console.log('Redirecionando para o checkout...');
  }
}
