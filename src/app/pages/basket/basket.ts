import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { LanguageService } from '../../services/language.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TRANSLATIONS, pluralKey } from '../../i18n/translations';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OrderSummaryComponent,
    ProductCardComponent,
    TranslatePipe,
  ],
  host: { class: 'block' },
  template: `
    <div class="mb-6">
      <h1 class="m-0 font-title text-4xl italic font-light text-gray-900">
        {{ 'basket.title' | translate:lang() }}
        <span class="ml-3 font-sans text-sm not-italic text-text-muted">{{ itemLabel() }}</span>
      </h1>
    </div>

    @if (basketItems().length === 0) {
      <p class="text-base text-text-secondary">{{ 'basket.empty' | translate:lang() }}</p>
    } @else {
      <div class="flex flex-col gap-6 md:flex-row">
        <div class="flex flex-col gap-3 md:flex-2">
          @for (item of basketItems(); track item.product.id) {
            <app-product-card
              [product]="item.product"
              [mode]="'basket'"
              [basketQuantity]="item.quantity"
              (remove)="basketService.removeItem($event)"
            />
          }
        </div>

        <aside class="md:flex-1 md:sticky md:top-4">
          <app-order-summary />
        </aside>
      </div>
    }
  `,
})
export class BasketComponent {
  protected readonly basketService = inject(BasketService);
  private readonly languageService = inject(LanguageService);
  protected readonly lang = this.languageService.language;

  readonly itemLabel = computed(() => {
    const count = this.basketService.itemCount();
    const lang = this.languageService.language();
    const key = pluralKey('common.item', count);
    return `${count} ${TRANSLATIONS[key][lang]}`;
  });

  readonly basketItems = this.basketService.items;
}
