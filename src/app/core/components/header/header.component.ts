import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { CartDropdownComponent } from '@features/cart/cart-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isCartOpen = signal(false);
  public cartService = inject(CartService);

  toggleCart(): void {
    this.isCartOpen.update(value => !value);
  }
}
