import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) isInCart!: boolean;
  @Output() addToCart = new EventEmitter<Product>();
}
