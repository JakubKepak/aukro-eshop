import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyCode } from '../services/currency.service';
import { formatPrice } from '../utils/format-price';

@Pipe({ name: 'appCurrency' })
export class AppCurrencyPipe implements PipeTransform {
  transform(amountCzk: number, rate: number, code: CurrencyCode): string {
    return formatPrice(amountCzk * rate, code);
  }
}
