import { CURRENCIES, CurrencyCode } from '../services/currency.service';

export function formatPrice(amount: number, code: CurrencyCode): string {
  const symbol = CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
  const formatted = amount.toFixed(2);

  const symbolMap: Record<CurrencyCode, string> = {
    CZK: `${formatted} ${symbol}`,
    EUR: `${symbol}${formatted}`,
    GBP: `${symbol}${formatted}`,
  };

  return symbolMap[code];
}
