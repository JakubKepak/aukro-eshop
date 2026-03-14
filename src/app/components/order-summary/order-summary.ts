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
    <mat-card appearance="outlined" class="summary-card">
      <mat-card-content>
        <h2 class="summary-title">{{ 'order.summary' | translate }}</h2>

        <div class="summary-row">
          <span>{{ 'order.subtotal' | translate }}</span>
          <span>{{ subtotalCzk() | appCurrency }}</span>
        </div>

        <div class="summary-row">
          <span>{{ 'order.shipping' | translate }}</span>
          <span>{{ shippingCzk | appCurrency }}</span>
        </div>

        <div class="summary-row">
          <span>{{ 'order.tax' | translate }}</span>
          <span>{{ taxCzk() | appCurrency }}</span>
        </div>

        <mat-divider />

        <div class="summary-row total-row">
          <span>{{ 'order.total' | translate }}</span>
          <span>{{ totalCzk() | appCurrency }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .summary-card {
      border-radius: 1rem;
    }

    .summary-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1rem;
      color: #111;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.9rem;
      color: #555;
    }

    .total-row {
      font-weight: 700;
      font-size: 1.1rem;
      color: #111;
      padding-top: 0.75rem;
    }

    mat-divider {
      margin: 0.5rem 0;
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
