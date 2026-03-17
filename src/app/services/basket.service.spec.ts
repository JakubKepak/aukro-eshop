import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { Product } from '../models/product.model';

const mockProduct: Product = {
  id: 'apple',
  name: { cs: 'Jablko', sk: 'Jablko', en: 'Apple' },
  priceCzk: 45,
  priceApi: 45,
  unit: 'kg',
  image: 'assets/images/apple.svg',
};

const mockProduct2: Product = {
  id: 'banana',
  name: { cs: 'Banán', sk: 'Banán', en: 'Banana' },
  priceCzk: 35,
  priceApi: 35,
  unit: 'kg',
  image: 'assets/images/banana.svg',
};

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should start with empty basket', () => {
    expect(service.items()).toEqual([]);
    expect(service.itemCount()).toBe(0);
    expect(service.subtotalCzk()).toBe(0);
  });

  it('should add an item', () => {
    service.addItem(mockProduct, 2);
    expect(service.itemCount()).toBe(1);
    expect(service.items()[0].product.id).toBe('apple');
    expect(service.items()[0].quantity).toBe(2);
  });

  it('should increase quantity when adding same product again', () => {
    service.addItem(mockProduct, 2);
    service.addItem(mockProduct, 3);
    expect(service.itemCount()).toBe(1);
    expect(service.items()[0].quantity).toBe(5);
  });

  it('should add multiple different products', () => {
    service.addItem(mockProduct, 1);
    service.addItem(mockProduct2, 2);
    expect(service.itemCount()).toBe(2);
  });

  it('should calculate subtotal correctly', () => {
    service.addItem(mockProduct, 2); // 45 * 2 = 90
    service.addItem(mockProduct2, 3); // 35 * 3 = 105
    expect(service.subtotalCzk()).toBe(195);
  });

  it('should remove an item by product id', () => {
    service.addItem(mockProduct, 1);
    service.addItem(mockProduct2, 1);
    service.removeItem('apple');
    expect(service.itemCount()).toBe(1);
    expect(service.items()[0].product.id).toBe('banana');
  });

  it('should handle removing non-existent item gracefully', () => {
    service.addItem(mockProduct, 1);
    service.removeItem('non-existent');
    expect(service.itemCount()).toBe(1);
  });

  it('should update subtotal after removal', () => {
    service.addItem(mockProduct, 2); // 90
    service.addItem(mockProduct2, 1); // 35
    service.removeItem('apple');
    expect(service.subtotalCzk()).toBe(35);
  });
});
