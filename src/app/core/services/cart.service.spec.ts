import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '@core/models/product.model';

describe('CartService', () => {
  let service: CartService;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    mockProduct = {
      id: '1',
      title: 'Test Game',
      price: 29.99,
      imageUrl: 'test.jpg',
      discount: 0
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].id).toBe(mockProduct.id);
  });

  it('should not add duplicate items to cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    expect(service.items().length).toBe(1);
  });

  it('should remove item from cart', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.id);
    expect(service.items().length).toBe(0);
  });

  it('should clear cart', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: '2' });
    service.clearCart();
    expect(service.items().length).toBe(0);
  });

  it('should calculate total items correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: '2' });
    expect(service.totalItems()).toBe(2);
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: '2', price: 19.99 });
    expect(service.totalPrice()).toBe(49.98);
  });

  it('should check if item is in cart', () => {
    service.addToCart(mockProduct);
    expect(service.isInCart(mockProduct.id)).toBe(true);
    expect(service.isInCart('non-existent')).toBe(false);
  });
});
