import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../models/product.model';
import { LanguageService } from '../../services/language.service';
import { CurrencyService, CURRENCIES, CurrencyCode } from '../../services/currency.service';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <img
        [src]="product().image"
        [alt]="displayName()"
        class="h-20 w-20 shrink-0 rounded-full object-cover bg-stone-100"
      />

      <div class="flex flex-1 flex-col gap-2">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-semibold text-gray-900 leading-tight">{{ displayName() }}</p>
            <p class="text-sm text-green-800 font-medium">
              {{ formattedUnitPrice() }} / {{ product().unit }}
            </p>
          </div>
          <p class="text-lg font-semibold text-gray-900 whitespace-nowrap ml-4">
            {{ formattedTotal() }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <mat-form-field appearance="outline" class="qty-field">
              <input
                matInput
                type="number"
                [value]="quantity()"
                (input)="onQuantityChange($event)"
                min="0.1"
                step="0.5"
                class="text-sm"
              />
            </mat-form-field>
            <span class="text-sm text-gray-500">{{ product().unit }}</span>
            <button mat-icon-button class="!w-8 !h-8" aria-label="Edit quantity">
              <mat-icon class="!text-base text-gray-400">edit</mat-icon>
            </button>
          </div>

          <button
            mat-flat-button
            class="!bg-green-900 !text-white !text-xs !rounded-md !px-3 !py-1"
            (click)="onAddToBasket()"
          >
            Add to basket
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .qty-field {
      width: 4rem;

      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }

      ::ng-deep .mat-mdc-text-field-wrapper {
        height: 32px;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        padding-top: 4px !important;
        padding-bottom: 4px !important;
        min-height: unset;
      }

      ::ng-deep input[type="number"] {
        -moz-appearance: textfield;
      }

      ::ng-deep input::-webkit-outer-spin-button,
      ::ng-deep input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  private readonly languageService = inject(LanguageService);
  private readonly currencyService = inject(CurrencyService);

  readonly quantity = signal(1);

  readonly displayName = computed(() =>
    this.product().name[this.languageService.language()]
  );

  readonly formattedUnitPrice = computed(() => {
    const converted = this.currencyService.convert(this.product().priceCzk);
    return this.formatPrice(converted);
  });

  readonly formattedTotal = computed(() => {
    const total = this.currencyService.convert(this.product().priceCzk) * this.quantity();
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
    const symbol = CURRENCIES.find(c => c.code === code)?.symbol ?? code;
    const formatted = amount.toFixed(2);

    const symbolMap: Record<CurrencyCode, string> = {
      CZK: `${formatted} ${symbol}`,
      EUR: `${symbol}${formatted}`,
      GBP: `${symbol}${formatted}`,
    };

    return symbolMap[code];
  }
}
