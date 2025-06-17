import { Injectable, computed, signal } from '@angular/core';
import { Product } from '@core/models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();
  readonly totalItems = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly totalPrice = computed(() => {
    return this.items().reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      return; // Product already in cart
    }

    this.cartItems.update(items => [
      ...items,
      { ...product, quantity: 1, isInCart: true }
    ]);
  }

  removeFromCart(productId: string): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== productId)
        .map(item => item.id === productId ? { ...item, isInCart: false } : item)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  isInCart(productId: string): boolean {
    return this.items().some(item => item.id === productId);
  }
}
