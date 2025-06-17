import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private products = signal<Product[]>([
    {
      id: '1',
      title: 'ODDWORLD: STRANGER\'S WRATH',
      price: 9.99,
      imageUrl: 'assets/oddworld.jpg',
      discount: 50
    },
    {
      id: '2',
      title: 'CHAOS ON DEPONIA',
      price: 19.99,
      imageUrl: 'assets/deponia.jpg',
      isOwned: true
    },
    {
      id: '3',
      title: 'THE SETTLERS 2: GOLD EDITION',
      price: 5.99,
      imageUrl: 'assets/settlers.jpg'
    },
    {
      id: '4',
      title: 'NEVERWINTER NIGHTS',
      price: 9.99,
      imageUrl: 'assets/neverwinter.jpg',
      discount: 50
    },
    {
      id: '5',
      title: 'ASSASSIN\'S CREED: DIRECTOR\'S CUT',
      price: 9.99,
      imageUrl: 'assets/acreed.jpg'
    }
  ]);

  getProducts() {
    return this.products.asReadonly();
  }
}
