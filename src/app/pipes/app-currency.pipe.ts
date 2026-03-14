import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { formatPrice } from '../utils/format-price';

@Pipe({
  name: 'appCurrency',
  pure: false,
})
export class AppCurrencyPipe implements PipeTransform {
  private readonly currencyService = inject(CurrencyService);

  transform(amountCzk: number): string {
    return formatPrice(
      this.currencyService.convert(amountCzk),
      this.currencyService.currency(),
    );
  }
}
