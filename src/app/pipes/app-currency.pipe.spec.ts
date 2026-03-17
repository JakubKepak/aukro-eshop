import { AppCurrencyPipe } from './app-currency.pipe';

describe('AppCurrencyPipe', () => {
  const pipe = new AppCurrencyPipe();

  it('should format CZK with symbol after amount', () => {
    expect(pipe.transform(100, 1, 'CZK')).toBe('100.00 Kč');
  });

  it('should format EUR with symbol before amount', () => {
    expect(pipe.transform(100, 0.0398, 'EUR')).toBe('€3.98');
  });

  it('should format GBP with symbol before amount', () => {
    expect(pipe.transform(100, 0.0332, 'GBP')).toBe('£3.32');
  });

  it('should handle zero', () => {
    expect(pipe.transform(0, 1, 'CZK')).toBe('0.00 Kč');
  });
});
