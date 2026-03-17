import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { BasketService } from '../../services/basket.service';
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
        <h2 class="mb-4 text-xl font-semibold text-gray-900">{{ 'order.summary' | translate }}</h2>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.subtotal' | translate }}</span>
          <span>{{ subtotalCzk() | appCurrency }}</span>
        </div>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.shipping' | translate }}</span>
          <span>{{ shippingCzk | appCurrency }}</span>
        </div>

        <div class="flex justify-between py-2 text-[0.9rem] text-gray-600">
          <span>{{ 'order.tax' | translate }}</span>
          <span>{{ taxCzk() | appCurrency }}</span>
        </div>

        <mat-divider class="my-2" />

        <div class="flex justify-between pt-3 text-[1.1rem] font-bold text-gray-900">
          <span>{{ 'order.total' | translate }}</span>
          <span>{{ totalCzk() | appCurrency }}</span>
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

  readonly shippingCzk = SHIPPING_CZK;

  readonly subtotalCzk = computed(() => this.basketService.subtotalCzk());

  readonly taxCzk = computed(() => this.basketService.subtotalCzk() * TAX_RATE);

  readonly totalCzk = computed(() =>
    this.basketService.subtotalCzk() * (1 + TAX_RATE) + SHIPPING_CZK,
  );
}
