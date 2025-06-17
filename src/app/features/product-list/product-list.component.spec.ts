import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';
import { GameCardComponent } from './game-card/game-card.component';
import { signal } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Test Game 1',
      price: 29.99,
      imageUrl: 'test1.jpg'
    },
    {
      id: '2',
      title: 'Test Game 2',
      price: 19.99,
      imageUrl: 'test2.jpg',
      isOwned: true
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['isInCart', 'addToCart']);

    // Create a mock signal that returns the mock products
    const mockProductsSignal = signal(mockProducts);
    productServiceSpy.getProducts.and.returnValue(mockProductsSignal.asReadonly());
    cartServiceSpy.isInCart.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, GameCardComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products from service', () => {
    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should render game cards for each product', () => {
    const gameCards = fixture.nativeElement.querySelectorAll('app-game-card');
    expect(gameCards.length).toBe(mockProducts.length);
  });

  it('should check if each product is in cart', () => {
    fixture.nativeElement.querySelectorAll('app-game-card').forEach((card: HTMLElement, index: number) => {
      expect(cartService.isInCart).toHaveBeenCalledWith(mockProducts[index].id);
    });
  });

  it('should have correct aria-label', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.getAttribute('aria-label')).toBe('Game List');
  });
});
