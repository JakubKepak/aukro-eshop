import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BasketService } from '../../services/basket.service';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';
import { formatPrice as fmtPrice } from '../../utils/format-price';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    OrderSummaryComponent,
  ],
  template: `
    <div class="page-header">
      <h1 class="page-title">
        Basket
        <span class="item-count">{{ basketService.itemCount() }} items</span>
      </h1>
    </div>

    @if (basketService.items().length === 0) {
      <p class="empty-msg">Your basket is empty.</p>
    } @else {
      <div class="basket-layout">
        <div class="basket-items">
          @for (item of basketService.items(); track item.product.id) {
            <mat-card appearance="outlined" class="basket-card">
              <mat-card-content>
                <div class="item-row">
                  <img
                    [src]="item.product.image"
                    [alt]="item.product.name[languageService.language()]"
                    class="item-image"
                  />

                  <div class="item-details">
                    <p class="item-name">
                      {{ item.product.name[languageService.language()] }}
                    </p>
                    <p class="item-price">
                      {{ formatPrice(currencyService.convert(item.product.priceCzk)) }}
                      / {{ item.product.unit }}
                    </p>
                    <p class="item-qty">
                      {{ item.quantity }} {{ item.product.unit }}
                    </p>
                  </div>

                  <div class="item-actions">
                    <p class="item-total">
                      {{ formatPrice(currencyService.convert(item.product.priceCzk * item.quantity)) }}
                    </p>
                    <button
                      mat-stroked-button
                      color="warn"
                      class="remove-btn"
                      (click)="basketService.removeItem(item.product.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>

        <aside class="basket-summary">
          <app-order-summary />
        </aside>
      </div>
    }
  `,
  styles: `
    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 2.25rem;
      font-style: italic;
      font-weight: 300;
      color: #111;
      margin: 0;
    }

    .item-count {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 0.875rem;
      font-style: normal;
      color: #9ca3af;
      margin-left: 0.75rem;
    }

    .empty-msg {
      color: #6b7280;
      font-size: 1rem;
    }

    .basket-layout {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .basket-layout {
        flex-direction: row;
      }

      .basket-items {
        flex: 2;
      }

      .basket-summary {
        flex: 1;
      }
    }

    .basket-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .basket-card {
      border-radius: 1rem;
    }

    .item-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.25rem;
    }

    .item-image {
      width: 4rem;
      height: 4rem;
      flex-shrink: 0;
      border-radius: 50%;
      object-fit: cover;
      background-color: #f5f0e8;
    }

    .item-details {
      flex: 1;
      min-width: 0;
    }

    .item-name {
      font-weight: 600;
      color: #111;
      margin: 0;
    }

    .item-price {
      font-size: 0.875rem;
      color: #1a4d1a;
      margin: 0;
    }

    .item-qty {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0.25rem 0 0;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .item-total {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111;
      margin: 0;
      white-space: nowrap;
    }

    .remove-btn {
      font-size: 0.75rem;
      border-radius: 0.5rem;
    }
  `,
})
export class BasketComponent {
  protected readonly basketService = inject(BasketService);
  protected readonly languageService = inject(LanguageService);
  protected readonly currencyService = inject(CurrencyService);

  formatPrice(amount: number): string {
    return fmtPrice(amount, this.currencyService.currency());
  }
}
