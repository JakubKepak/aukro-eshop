import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BasketService } from '../../services/basket.service';
import { LanguageService } from '../../services/language.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary';
import { AppCurrencyPipe } from '../../pipes/app-currency.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TRANSLATIONS } from '../../i18n/translations';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    OrderSummaryComponent,
    TranslatePipe,
    AppCurrencyPipe,
  ],
  template: `
    <div class="page-header">
      <h1 class="page-title">
        {{ 'basket.title' | translate }}
        <span class="item-count">{{ itemLabel() }}</span>
      </h1>
    </div>

    @if (displayItems().length === 0) {
      <p class="empty-msg">{{ 'basket.empty' | translate }}</p>
    } @else {
      <div class="basket-layout">
        <div class="basket-items">
          @for (item of displayItems(); track item.id) {
            <mat-card appearance="outlined" class="basket-card">
              <mat-card-content>
                <div class="item-row">
                  <img
                    [src]="item.image"
                    [alt]="item.name"
                    class="item-image"
                  />

                  <div class="item-details">
                    <p class="item-name">{{ item.name }}</p>
                    <p class="item-price">
                      {{ item.priceCzk | appCurrency }} / {{ item.unit }}
                    </p>
                    <p class="item-qty">
                      {{ item.quantity }} {{ item.unit }}
                    </p>
                  </div>

                  <div class="item-actions">
                    <p class="item-total">{{ item.totalCzk | appCurrency }}</p>
                    <button
                      mat-stroked-button
                      color="warn"
                      class="remove-btn"
                      (click)="basketService.removeItem(item.id)"
                    >
                      {{ 'common.remove' | translate }}
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
  private readonly languageService = inject(LanguageService);

  readonly itemLabel = computed(() => {
    const count = this.basketService.itemCount();
    const lang = this.languageService.language();
    const label = count === 1
      ? TRANSLATIONS['common.item'][lang]
      : TRANSLATIONS['common.items'][lang];
    return `${count} ${label}`;
  });

  readonly displayItems = computed(() => {
    const lang = this.languageService.language();

    return this.basketService.items().map((item) => ({
      id: item.product.id,
      name: item.product.name[lang],
      image: item.product.image,
      unit: item.product.unit,
      quantity: item.quantity,
      priceCzk: item.product.priceCzk,
      totalCzk: item.product.priceCzk * item.quantity,
    }));
  });
}
