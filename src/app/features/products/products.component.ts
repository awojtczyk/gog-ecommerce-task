import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBannerComponent } from '@features/main-banner/main-banner.component';
import { ProductListComponent } from '@features/product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MainBannerComponent, ProductListComponent],
  template: `
    <app-main-banner />
    <app-product-list />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }
  `]
})
export class ProductsComponent {}
