import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';
import { GameCardComponent } from './game-card/game-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  template: `
    <section class="product-list" aria-label="Game List">
      @for (product of productService.getProducts()(); track product.id) {
        <app-game-card
          [product]="product"
          [isInCart]="cartService.isInCart(product.id)"
          (addToCart)="onAddToCart($event)"
        />
      }
    </section>
  `,
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  public productService = inject(ProductService);
  public cartService = inject(CartService);

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
