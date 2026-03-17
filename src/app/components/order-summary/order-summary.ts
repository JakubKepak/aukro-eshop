import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { BasketService } from '../../services/basket.service';
import { CurrencyService } from '../../services/currency.service';
import { LanguageService } from '../../services/language.service';
import { SHIPPING_CZK, TAX_RATE } from '../../utils/order-config';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AppCurrencyPipe } from '../../pipes/app-currency.pipe';

@Component({
  selector: 'app-order-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatDividerModule, TranslatePipe, AppCurrencyPipe],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <h2 class="mb-4 text-xl font-semibold text-gray-900">{{ 'order.summary' | translate:lang() }}</h2>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.subtotal' | translate:lang() }}</span>
          <span>{{ subtotalCzk() | appCurrency:rate():currencyCode() }}</span>
        </div>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.shipping' | translate:lang() }}</span>
          <span>{{ shippingCzk | appCurrency:rate():currencyCode() }}</span>
        </div>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.tax' | translate:lang() }}</span>
          <span>{{ taxCzk() | appCurrency:rate():currencyCode() }}</span>
        </div>

        <mat-divider class="my-2" />

        <div class="flex justify-between pt-3 text-[1.1rem] font-bold text-gray-900">
          <span>{{ 'order.total' | translate:lang() }}</span>
          <span>{{ totalCzk() | appCurrency:rate():currencyCode() }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    :host {
      --mdc-outlined-card-container-shape: 1rem;
    }
  `,
})
export class OrderSummaryComponent {
  private readonly basketService = inject(BasketService);
  private readonly currencyService = inject(CurrencyService);
  private readonly languageService = inject(LanguageService);

  protected readonly lang = this.languageService.language;
  protected readonly rate = this.currencyService.rate;
  protected readonly currencyCode = this.currencyService.currency;

  readonly shippingCzk = SHIPPING_CZK;

  readonly subtotalCzk = computed(() => this.basketService.subtotalCzk());

  readonly taxCzk = computed(() => this.basketService.subtotalCzk() * TAX_RATE);

  readonly totalCzk = computed(() =>
    this.basketService.subtotalCzk() * (1 + TAX_RATE) + SHIPPING_CZK,
  );
}
