import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AppCurrencyPipe } from '../../pipes/app-currency.pipe';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    TranslatePipe,
    AppCurrencyPipe,
  ],
  host: { class: 'block' },
  template: `
    <mat-card class="overflow-hidden">
      <mat-card-content>
        <div class="flex items-stretch">
          <img
            [src]="product().image"
            [alt]="displayName()"
            class="w-[28%] shrink-0 bg-white object-cover"
          />

          <div class="flex min-w-0 flex-1 flex-col justify-center gap-2.5 px-5 py-4">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="m-0 text-[1.0625rem] font-semibold leading-tight text-text-primary">{{ displayName() }}</p>
                <p class="mt-0.5 text-[0.9375rem] font-medium text-price-green">
                  {{ product().priceCzk | appCurrency }} / {{ product().unit }}
                </p>
                @if (mode() === 'basket') {
                  <p class="mt-1 text-[0.8125rem] text-text-secondary">{{ quantity() }} {{ product().unit }}</p>
                }
              </div>
              <p class="m-0 whitespace-nowrap text-xl font-bold text-text-primary">{{ (product().priceCzk * quantity()) | appCurrency }}</p>
            </div>

            <div class="mt-0.5 flex items-center justify-between gap-3">
              @if (mode() === 'shop') {
                <mat-form-field
                  appearance="outline"
                  subscriptSizing="dynamic"
                  class="qty-field w-32"
                >
                  <input
                    matInput
                    type="number"
                    class="hide-spinner w-6 text-sm font-medium"
                    [value]="quantity()"
                    (input)="onQuantityChange($event)"
                    (focus)="inputFocused.set(true)"
                    (blur)="inputFocused.set(false)"
                    min="0.1"
                    step="0.5"
                  />
                  @if (!inputFocused()) {
                    <span matTextSuffix class="-ml-0.5 text-sm font-medium text-text-primary">{{ product().unit }}</span>
                  }
                  <mat-icon matSuffix class="qty-icon text-gray-400">edit</mat-icon>
                </mat-form-field>

                <button
                  mat-flat-button
                  color="primary"
                  class="add-btn whitespace-nowrap px-5 text-[0.8125rem] font-medium tracking-tight"
                  (click)="onAddToBasket()"
                >
                  {{ 'product.addToBasket' | translate }}
                </button>
              } @else {
                <button
                  mat-stroked-button
                  class="remove-btn ml-auto px-5 text-[0.8125rem] font-medium"
                  (click)="remove.emit(product().id)"
                >
                  {{ 'common.remove' | translate }}
                </button>
              }
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    :host {
      --mdc-elevated-card-container-color: #f8f6f2;
      --mdc-elevated-card-container-shape: 1rem;
      --mdc-elevated-card-container-elevation: 0 1px 4px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.04);
      --mat-card-content-padding: 0;
    }

    .qty-field {
      --mdc-outlined-text-field-outline-color: #d5d0c8;
      --mdc-outlined-text-field-container-shape: 999px;
      --mat-form-field-container-height: 2rem;
      --mat-form-field-container-vertical-padding: 0.3rem;
    }

    .remove-btn {
      --mdc-outlined-button-label-text-color: #c62828;
      --mdc-outlined-button-outline-color: #c62828;
      --mdc-outlined-button-container-shape: 0.625rem;
    }

    .add-btn {
      --mdc-filled-button-container-shape: 0.625rem;
    }

    .qty-icon {
      --mat-icon-size: 1rem;
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly mode = input<'shop' | 'basket'>('shop');
  readonly basketQuantity = input(1);
  readonly remove = output<string>();

  private readonly languageService = inject(LanguageService);
  private readonly basketService = inject(BasketService);

  private readonly editableQty = signal(1);
  readonly quantity = computed(() =>
    this.mode() === 'basket' ? this.basketQuantity() : this.editableQty(),
  );
  readonly inputFocused = signal(false);

  readonly displayName = computed(() =>
    this.product().name[this.languageService.language()],
  );

  onQuantityChange(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    if (val > 0) {
      this.editableQty.set(val);
    }
  }

  onAddToBasket(): void {
    this.basketService.addItem(this.product(), this.quantity());
    this.editableQty.set(1);
  }

}
