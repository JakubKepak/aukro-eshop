import { TestBed } from '@angular/core/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  it('should default to CZK', () => {
    expect(service.currency()).toBe('CZK');
  });

  it('should have rate 1 for CZK', () => {
    expect(service.rate()).toBe(1);
  });

  it('should switch currency', () => {
    service.setCurrency('EUR');
    expect(service.currency()).toBe('EUR');
  });

  it('should update rate when currency changes', () => {
    service.setCurrency('EUR');
    expect(service.rate()).toBe(0.0398);

    service.setCurrency('GBP');
    expect(service.rate()).toBe(0.0332);
  });

  it('should convert CZK amounts using current rate', () => {
    expect(service.convert(100)).toBe(100);

    service.setCurrency('EUR');
    expect(service.convert(100)).toBeCloseTo(3.98);

    service.setCurrency('GBP');
    expect(service.convert(100)).toBeCloseTo(3.32);
  });

  it('should convert zero correctly', () => {
    service.setCurrency('EUR');
    expect(service.convert(0)).toBe(0);
  });
});
