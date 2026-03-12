import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card';
import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { ComponentRef } from '@angular/core';

const mockProduct: Product = {
  id: 'apple',
  name: { cs: 'Jablko', sk: 'Jablko', en: 'Apple' },
  priceCzk: 45,
  unit: 'kg',
  image: 'assets/images/apple.svg',
};

describe('ProductCardComponent', () => {
  let fixture: ComponentFixture<ProductCardComponent>;
  let component: ProductCardComponent;
  let componentRef: ComponentRef<ProductCardComponent>;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('product', mockProduct);
    basketService = TestBed.inject(BasketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product name in default language (cs)', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Jablko');
  });

  it('should display the unit price', () => {
    const el: HTMLElement = fixture.nativeElement;
    // Default currency is CZK, price is 45
    expect(el.textContent).toContain('45');
    expect(el.textContent).toContain('kg');
  });

  it('should default quantity to 1', () => {
    expect(component.quantity()).toBe(1);
  });

  it('should update quantity on input change', () => {
    const inputEvent = { target: { value: '3' } } as unknown as Event;
    component.onQuantityChange(inputEvent);
    expect(component.quantity()).toBe(3);
  });

  it('should not update quantity to zero', () => {
    const inputEvent = { target: { value: '0' } } as unknown as Event;
    component.onQuantityChange(inputEvent);
    expect(component.quantity()).toBe(1);
  });

  it('should not update quantity to negative', () => {
    const inputEvent = { target: { value: '-1' } } as unknown as Event;
    component.onQuantityChange(inputEvent);
    expect(component.quantity()).toBe(1);
  });

  it('should not update quantity on empty input (NaN)', () => {
    const inputEvent = { target: { value: '' } } as unknown as Event;
    component.onQuantityChange(inputEvent);
    expect(component.quantity()).toBe(1);
  });

  it('should add product to basket and reset quantity', () => {
    component.quantity.set(3);
    component.onAddToBasket();
    expect(basketService.itemCount()).toBe(1);
    expect(basketService.items()[0].quantity).toBe(3);
    expect(component.quantity()).toBe(1);
  });

  it('should compute formatted total based on quantity', () => {
    component.quantity.set(2);
    // 45 CZK * 2 = 90 CZK
    expect(component.formattedTotal()).toContain('90');
  });
});
