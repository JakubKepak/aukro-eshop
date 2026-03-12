import { computed, Injectable, signal } from '@angular/core';

export type CurrencyCode = 'CZK' | 'EUR' | 'GBP';

export const CURRENCIES: { code: CurrencyCode; symbol: string }[] = [
  { code: 'CZK', symbol: 'Kč' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
];

// Exchange rates as of 31.12.2024 (base: CZK)
const RATES_FROM_CZK: Record<CurrencyCode, number> = {
  CZK: 1,
  EUR: 0.0398,
  GBP: 0.0332,
};

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly currency = signal<CurrencyCode>('CZK');
  readonly rate = computed(() => RATES_FROM_CZK[this.currency()]);

  setCurrency(code: CurrencyCode): void {
    this.currency.set(code);
  }

  convert(amountInCzk: number): number {
    return amountInCzk * this.rate();
  }
}
