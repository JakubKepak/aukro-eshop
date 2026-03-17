import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS, pluralKey } from '../../i18n/translations';

@Component({
  selector: 'app-shop-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, TranslatePipe],
  host: { class: 'block' },
  template: `
    <div class="mb-6">
      <h1 class="m-0 font-title text-4xl italic font-light text-gray-900">
        {{ 'shop.title' | translate:lang() }}
        <span class="ml-3 font-sans text-sm not-italic text-text-muted">{{ itemLabel() }}</span>
      </h1>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
  `,
})
export class ShopListComponent {
  private readonly productService = inject(ProductService);
  private readonly languageService = inject(LanguageService);
  protected readonly lang = this.languageService.language;

  readonly products = this.productService.products;
  readonly productCount = computed(() => this.products().length);
  readonly itemLabel = computed(() => {
    const count = this.productCount();
    const lang = this.languageService.language();
    const key = pluralKey('common.item', count);
    return `${count} ${TRANSLATIONS[key][lang]}`;
  });
}
