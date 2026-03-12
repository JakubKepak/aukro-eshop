import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';
import {
  CurrencyService,
  CURRENCIES,
  CurrencyCode,
} from '../../services/currency.service';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  host: { class: 'block' },
  template: `
    <mat-card appearance="outlined" class="card">
      <mat-card-content>
        <div class="card-row">
          <img
            [src]="product().image"
            [alt]="displayName()"
            class="card-image"
          />

          <div class="card-content">
            <div class="card-top">
              <div>
                <p class="product-name">{{ displayName() }}</p>
                <p class="product-price">
                  {{ formattedUnitPrice() }} / {{ product().unit }}
                </p>
              </div>
              <p class="product-total">{{ formattedTotal() }}</p>
            </div>

            <div class="card-bottom">
              <div class="qty-row">
                <mat-form-field
                  appearance="outline"
                  subscriptSizing="dynamic"
                  class="qty-field"
                >
                  <input
                    matInput
                    type="number"
                    [value]="quantity()"
                    (input)="onQuantityChange($event)"
                    min="0.1"
                    step="0.5"
                  />
                </mat-form-field>
                <span class="unit-label">{{ product().unit }}</span>
                <button
                  mat-icon-button
                  aria-label="Edit quantity"
                  class="edit-btn"
                >
                  <mat-icon>edit</mat-icon>
                </button>
              </div>

              <button
                mat-flat-button
                color="primary"
                class="add-btn"
                (click)="onAddToBasket()"
              >
                Add to basket
              </button>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .card {
      border-radius: 1rem;
    }

    .card-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.25rem;
    }

    .card-image {
      width: 5rem;
      height: 5rem;
      flex-shrink: 0;
      border-radius: 50%;
      object-fit: cover;
      background-color: #f5f0e8;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }

    .card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .product-name {
      font-weight: 600;
      color: #111;
      line-height: 1.25;
      margin: 0;
    }

    .product-price {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1a4d1a;
      margin: 0;
    }

    .product-total {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111;
      white-space: nowrap;
      margin: 0;
    }

    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }

    .qty-row {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .qty-field {
      width: 3.5rem;

      ::ng-deep .mat-mdc-text-field-wrapper {
        padding: 0 8px;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        padding: 4px 0;
        min-height: 32px;
      }

      ::ng-deep input {
        font-size: 0.875rem;
        text-align: center;
      }

      ::ng-deep input[type='number']::-webkit-outer-spin-button,
      ::ng-deep input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      ::ng-deep input[type='number'] {
        -moz-appearance: textfield;
      }
    }

    .unit-label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .edit-btn {
      width: 2rem;
      height: 2rem;

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: #9ca3af;
      }
    }

    .add-btn {
      border-radius: 0.5rem;
      font-size: 0.8rem;
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  private readonly languageService = inject(LanguageService);
  private readonly currencyService = inject(CurrencyService);

  readonly quantity = signal(1);

  readonly displayName = computed(() =>
    this.product().name[this.languageService.language()],
  );

  readonly formattedUnitPrice = computed(() => {
    const converted = this.currencyService.convert(this.product().priceCzk);
    return this.formatPrice(converted);
  });

  readonly formattedTotal = computed(() => {
    const total =
      this.currencyService.convert(this.product().priceCzk) * this.quantity();
    return this.formatPrice(total);
  });

  onQuantityChange(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    if (val > 0) {
      this.quantity.set(val);
    }
  }

  onAddToBasket(): void {
    // Will be wired to BasketService in Block 4
  }

  private formatPrice(amount: number): string {
    const code = this.currencyService.currency();
    const symbol =
      CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
    const formatted = amount.toFixed(2);

    const symbolMap: Record<CurrencyCode, string> = {
      CZK: `${formatted} ${symbol}`,
      EUR: `${symbol}${formatted}`,
      GBP: `${symbol}${formatted}`,
    };

    return symbolMap[code];
  }
}
