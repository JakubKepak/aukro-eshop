import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../i18n/translations';

@Component({
  selector: 'app-shop-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, TranslatePipe],
  template: `
    <div class="page-header">
      <h1 class="page-title">
        {{ 'shop.title' | translate }}
        <span class="item-count">{{ itemLabel() }}</span>
      </h1>
    </div>

    <div class="product-grid">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
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

    .product-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .product-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `,
})
export class ShopListComponent {
  private readonly productService = inject(ProductService);
  private readonly languageService = inject(LanguageService);

  readonly products = this.productService.products;
  readonly productCount = computed(() => this.products().length);
  readonly itemLabel = computed(() => {
    const count = this.productCount();
    const lang = this.languageService.language();
    const label = count === 1
      ? TRANSLATIONS['common.item'][lang]
      : TRANSLATIONS['common.items'][lang];
    return `${count} ${label}`;
  });
}
