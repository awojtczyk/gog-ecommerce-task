import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products as a signal', () => {
    const products = service.getProducts()();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].id).toBeDefined();
    expect(products[0].title).toBeDefined();
    expect(products[0].price).toBeDefined();
    expect(products[0].imageUrl).toBeDefined();
  });

  it('should have the same products on subsequent calls', () => {
    const products1 = service.getProducts()();
    const products2 = service.getProducts()();
    expect(products1).toBe(products2);
  });
});
