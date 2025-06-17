import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartService } from '@core/services/cart.service';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent
      ],
      providers: [
        CartService,
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart count', () => {
    const mockProduct = {
      id: '1',
      title: 'Test Game',
      price: 29.99,
      imageUrl: 'test.jpg'
    };
    cartService.addToCart(mockProduct);
    fixture.detectChanges();

    const cartCount = fixture.debugElement.query(By.css('.page-header__cart-count'));
    expect(cartCount.nativeElement.textContent.trim()).toBe('1');
  });

  it('should toggle cart dropdown', () => {
    expect(component.isCartOpen()).toBe(false);

    const cartButton = fixture.debugElement.query(By.css('.page-header__cart-button'));
    cartButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCartOpen()).toBe(true);
    expect(fixture.debugElement.query(By.css('app-cart-dropdown'))).toBeTruthy();

    cartButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCartOpen()).toBe(false);
    expect(fixture.debugElement.query(By.css('app-cart-dropdown'))).toBeNull();
  });

  it('should have correct aria attributes', () => {
    const cartButton = fixture.debugElement.query(By.css('.page-header__cart-button'));
    expect(cartButton.attributes['aria-expanded']).toBe('false');
    expect(cartButton.attributes['aria-controls']).toBe('cart-dropdown');

    cartService.addToCart({
      id: '1',
      title: 'Test Game',
      price: 29.99,
      imageUrl: 'test.jpg'
    });
    fixture.detectChanges();

    expect(cartButton.attributes['aria-label']).toContain('Shopping cart with 1 items');
  });

  it('should update aria-expanded when cart is toggled', () => {
    const cartButton = fixture.debugElement.query(By.css('.page-header__cart-button'));
    expect(cartButton.attributes['aria-expanded']).toBe('false');

    // Open cart
    cartButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(cartButton.attributes['aria-expanded']).toBe('true');

    // Close cart
    cartButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(cartButton.attributes['aria-expanded']).toBe('false');
  });
});
