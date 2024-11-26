import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from '../service/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  private readonly apiUrl = 'http://localhost:5001/api/carrinho'; // URL do backend

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartFromServer(); // Carregar o carrinho do servidor ao inicializar
  }

  // Carrega o carrinho do servidor para o usuário atual
  private loadCartFromServer() {
    const userId = this.getUserId();
    if (!userId) return;

    this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`)
      .pipe(
        tap((cart) => {
          this.cart = cart;
          this.cartSubject.next(this.cart); // Atualiza o BehaviorSubject
        }),
        catchError((error) => {
          console.error('Erro ao carregar carrinho do servidor:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Define o userId e recarrega o carrinho
  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
    this.loadCartFromServer();
  }

  // Obtém o carrinho como Observable
  getCart() {
    return this.cart$;
  }

  // Adiciona um item ao carrinho e sincroniza com o servidor
  addToCart(item: CartItem) {
    if (!item || !item.id || item.quantity <= 0) return;

    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push({ ...item });
    }

    this.syncCartWithServer('add', item);
    this.cartSubject.next(this.cart);
  }

  // Remove um item do carrinho e sincroniza com o servidor
  removerCarrinho(item: CartItem) {
    if (!item || !item.id) return;

    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
    this.syncCartWithServer('remove', item);
    this.cartSubject.next(this.cart);
  }

  // Limpa o carrinho no frontend e no servidor
  clearCart() {
    this.cart = [];
    const userId = this.getUserId();

    if (userId) {
      this.http.post(`${this.apiUrl}/clear`, { userId })
        .pipe(
          tap(() => console.log('Carrinho limpo no servidor')),
          catchError((error) => {
            console.error('Erro ao limpar carrinho no servidor:', error);
            return throwError(() => error);
          })
        )
        .subscribe();
    }

    this.cartSubject.next(this.cart);
  }

  // Atualiza a quantidade de um item no carrinho e sincroniza com o servidor
  updateCart(item: CartItem) {
    if (!item || !item.id || item.quantity <= 0) return;

    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
      this.syncCartWithServer('update', item);
      this.cartSubject.next(this.cart);
    }
  }

  // Retorna o total de itens no carrinho
  getCartItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Sincroniza as alterações no carrinho com o servidor
  private syncCartWithServer(action: 'add' | 'remove' | 'update', item: CartItem) {
    const userId = this.getUserId();
    if (!userId || !item.id) return;

    const url = `${this.apiUrl}/${action}`;
    const data = { userId, itemId: item.id, quantity: item.quantity };

    this.http.post(url, data)
      .pipe(
        tap(() => console.log(`Item ${action} sincronizado com o servidor`)),
        catchError((error) => {
          console.error(`Erro ao sincronizar item (${action}) com o servidor:`, error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  // Obtém o userId armazenado no localStorage
  private getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
