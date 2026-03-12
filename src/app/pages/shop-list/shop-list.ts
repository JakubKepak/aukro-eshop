import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-shop-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent],
  template: `
    <div class="mb-6">
      <h1 class="font-serif text-4xl italic font-light text-gray-900">
        Shoplist
        <span class="text-sm font-sans not-italic text-gray-400 ml-3">
          {{ productCount() }} items
        </span>
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
  `,
})
export class ShopListComponent {
  private readonly productService = inject(ProductService);

  readonly products = this.productService.products;
  readonly productCount = computed(() => this.products().length);
}
