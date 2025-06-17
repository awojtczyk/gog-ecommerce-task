import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { Product } from '@core/models/product.model';
import { By } from '@angular/platform-browser';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Game',
    price: 29.99,
    imageUrl: 'test.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    component.isInCart = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product title', () => {
    const titleElement = fixture.debugElement.query(By.css('.game-card__title'));
    expect(titleElement.nativeElement.textContent).toContain(mockProduct.title);
  });

  it('should display product image with correct src and alt', () => {
    const imgElement = fixture.debugElement.query(By.css('.game-card__image'));
    expect(imgElement.nativeElement.src).toContain(mockProduct.imageUrl);
    expect(imgElement.nativeElement.alt).toBe(mockProduct.title);
  });

  it('should display price button when not in cart and not owned', () => {
    const priceButton = fixture.debugElement.query(By.css('.badge--price'));
    expect(priceButton).toBeTruthy();
    expect(priceButton.nativeElement.textContent.trim()).toContain('$29.99');
  });

  it('should emit addToCart event when price button is clicked', () => {
    spyOn(component.addToCart, 'emit');
    const priceButton = fixture.debugElement.query(By.css('.badge--price'));
    priceButton.nativeElement.click();
    expect(component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should display IN CART badge when isInCart is true', () => {
    component.isInCart = true;
    fixture.detectChanges();

    const inCartBadge = fixture.debugElement.query(By.css('.badge--in-cart'));
    expect(inCartBadge).toBeTruthy();
    expect(inCartBadge.nativeElement.textContent.trim()).toBe('IN CART');
    expect(fixture.debugElement.query(By.css('.badge--price'))).toBeFalsy();
  });

  it('should display OWNED badge when product is owned', () => {
    component.product = { ...mockProduct, isOwned: true };
    fixture.detectChanges();

    const ownedBadge = fixture.debugElement.query(By.css('.badge--owned'));
    expect(ownedBadge).toBeTruthy();
    expect(ownedBadge.nativeElement.textContent.trim()).toBe('OWNED');
    expect(fixture.debugElement.query(By.css('.badge--price'))).toBeFalsy();
  });

  it('should display discount badge when product has discount', () => {
    component.product = { ...mockProduct, discount: 50 };
    fixture.detectChanges();

    const discountBadge = fixture.debugElement.query(By.css('.badge--discount'));
    expect(discountBadge).toBeTruthy();
    expect(discountBadge.nativeElement.textContent.trim()).toBe('-50%');
  });

  it('should have correct aria-label on price button', () => {
    const priceButton = fixture.debugElement.query(By.css('.badge--price'));
    expect(priceButton.nativeElement.getAttribute('aria-label')).toBe('Add Test Game to cart');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    const articleElement = fixture.debugElement.query(By.css('.game-card'));
    const titleElement = fixture.debugElement.query(By.css('.game-card__title'));

    expect(articleElement.nativeElement.getAttribute('aria-labelledby')).toBe('game-title-1');
    expect(titleElement.nativeElement.id).toBe('game-title-1');
  });

  it('should have proper ARIA attributes on owned badge', () => {
    component.product = { ...mockProduct, isOwned: true };
    fixture.detectChanges();

    const ownedBadge = fixture.debugElement.query(By.css('.badge--owned'));
    expect(ownedBadge.nativeElement.getAttribute('role')).toBe('status');
    expect(ownedBadge.nativeElement.getAttribute('aria-label')).toBe('Game already owned');
  });

  it('should have proper ARIA attributes on in-cart badge', () => {
    component.isInCart = true;
    fixture.detectChanges();

    const inCartBadge = fixture.debugElement.query(By.css('.badge--in-cart'));
    expect(inCartBadge.nativeElement.getAttribute('role')).toBe('status');
    expect(inCartBadge.nativeElement.getAttribute('aria-label')).toBe('Game already in cart');
  });

  it('should have proper ARIA attributes on discount badge', () => {
    component.product = { ...mockProduct, discount: 50 };
    fixture.detectChanges();

    const discountBadge = fixture.debugElement.query(By.css('.badge--discount'));
    expect(discountBadge.nativeElement.getAttribute('role')).toBe('status');
    expect(discountBadge.nativeElement.getAttribute('aria-label')).toBe('50 percent discount');
  });
});
