import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { LanguageService } from '../../services/language.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TRANSLATIONS } from '../../i18n/translations';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OrderSummaryComponent,
    ProductCardComponent,
    TranslatePipe,
  ],
  template: `
    <div class="page-header">
      <h1 class="page-title">
        {{ 'basket.title' | translate }}
        <span class="item-count">{{ itemLabel() }}</span>
      </h1>
    </div>

    @if (basketItems().length === 0) {
      <p class="empty-msg">{{ 'basket.empty' | translate }}</p>
    } @else {
      <div class="basket-layout">
        <div class="basket-items">
          @for (item of basketItems(); track item.product.id) {
            <app-product-card
              [product]="item.product"
              [mode]="'basket'"
              [basketQuantity]="item.quantity"
              (remove)="basketService.removeItem($event)"
            />
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

  readonly basketItems = this.basketService.items;
}
