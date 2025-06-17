import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDropdownComponent } from './cart-dropdown.component';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';

describe('CartDropdownComponent', () => {
  let component: CartDropdownComponent;
  let fixture: ComponentFixture<CartDropdownComponent>;
  let cartService: CartService;
  const mockProduct: Product = {
    id: '1',
    title: 'Test Game',
    price: 9.99,
    imageUrl: 'test.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDropdownComponent],
      providers: [CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDropdownComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when cart is empty', () => {
    const countElement = fixture.nativeElement.querySelector('.cart-dropdown__count');
    expect(countElement.textContent).toContain('0 ITEMS IN CART');
  });

  it('should display correct item count and total when items are in cart', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();

    const countElement = fixture.nativeElement.querySelector('.cart-dropdown__count');
    const totalElement = fixture.nativeElement.querySelector('.cart-dropdown__total');

    expect(countElement.textContent).toContain('1 ITEMS IN CART');
    expect(totalElement.textContent).toContain('$9.99');
  });

  it('should clear cart when clear button is clicked', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.cart-dropdown__clear-button');
    clearButton.click();
    fixture.detectChanges();

    const countElement = fixture.nativeElement.querySelector('.cart-dropdown__count');
    expect(countElement.textContent).toContain('0 ITEMS IN CART');
  });

  it('should remove item when remove button is clicked', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('.cart-dropdown__remove-button');
    removeButton.click();
    fixture.detectChanges();

    const countElement = fixture.nativeElement.querySelector('.cart-dropdown__count');
    expect(countElement.textContent).toContain('0 ITEMS IN CART');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    const cartDropdown = fixture.nativeElement.querySelector('.cart-dropdown');
    const countElement = fixture.nativeElement.querySelector('.cart-dropdown__count');
    const totalElement = fixture.nativeElement.querySelector('.cart-dropdown__total');
    const clearButton = fixture.nativeElement.querySelector('.cart-dropdown__clear-button');
    const productsList = fixture.nativeElement.querySelector('.cart-dropdown__products');

    expect(cartDropdown.id).toBe('cart-dropdown');
    expect(cartDropdown.getAttribute('role')).toBe('dialog');
    expect(cartDropdown.getAttribute('aria-label')).toBe('Shopping cart details');

    expect(countElement.getAttribute('role')).toBe('status');
    expect(countElement.getAttribute('aria-live')).toBe('polite');

    expect(totalElement.getAttribute('role')).toBe('status');
    expect(totalElement.getAttribute('aria-live')).toBe('polite');

    expect(clearButton.getAttribute('aria-label')).toBe('Clear all items from cart');

    expect(productsList.getAttribute('role')).toBe('list');

    // Add a product to test product-specific ARIA attributes
    cartService.addToCart(mockProduct);
    fixture.detectChanges();

    const productItem = fixture.nativeElement.querySelector('.cart-dropdown__product');
    const removeButton = fixture.nativeElement.querySelector('.cart-dropdown__remove-button');
    const priceElement = fixture.nativeElement.querySelector('.cart-dropdown__product-price');

    expect(productItem.getAttribute('role')).toBe('listitem');
    expect(removeButton.getAttribute('aria-label')).toContain('Remove Test Game from cart');
    expect(priceElement.getAttribute('aria-label')).toBe('Price');
  });
});
