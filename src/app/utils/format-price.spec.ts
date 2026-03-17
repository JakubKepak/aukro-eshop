import { formatPrice } from './format-price';

describe('formatPrice', () => {
  it('should format CZK with symbol after', () => {
    expect(formatPrice(99.5, 'CZK')).toBe('99.50 Kč');
  });

  it('should format EUR with symbol before', () => {
    expect(formatPrice(3.98, 'EUR')).toBe('€3.98');
  });

  it('should format GBP with symbol before', () => {
    expect(formatPrice(3.32, 'GBP')).toBe('£3.32');
  });

  it('should format zero', () => {
    expect(formatPrice(0, 'CZK')).toBe('0.00 Kč');
  });

  it('should round to 2 decimal places', () => {
    expect(formatPrice(1.999, 'CZK')).toBe('2.00 Kč');
    expect(formatPrice(1.006, 'EUR')).toBe('€1.01');
  });
});
