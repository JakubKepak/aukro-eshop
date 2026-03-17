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
    <mat-card class="card">
      <mat-card-content>
        <div class="card-row">
          <img
            [src]="product().image"
            [alt]="displayName()"
            class="card-image"
          />

          <div class="card-content">
            <div class="card-top">
              <div class="card-info">
                <p class="product-name">{{ displayName() }}</p>
                <p class="product-price">
                  {{ product().priceCzk | appCurrency }} / {{ product().unit }}
                </p>
                @if (mode() === 'basket') {
                  <p class="product-qty">{{ quantity() }} {{ product().unit }}</p>
                }
              </div>
              <p class="product-total">{{ (product().priceCzk * quantity()) | appCurrency }}</p>
            </div>

            <div class="card-bottom">
              @if (mode() === 'shop') {
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
                    (focus)="inputFocused.set(true)"
                    (blur)="inputFocused.set(false)"
                    min="0.1"
                    step="0.5"
                  />
                  @if (!inputFocused()) {
                    <span matTextSuffix class="unit-label">{{ product().unit }}</span>
                  }
                  <mat-icon matSuffix class="qty-icon">edit</mat-icon>
                </mat-form-field>

                <button
                  mat-flat-button
                  color="primary"
                  class="add-btn"
                  (click)="onAddToBasket()"
                >
                  {{ 'product.addToBasket' | translate }}
                </button>
              } @else {
                <span></span>
                <button
                  mat-stroked-button
                  class="remove-btn"
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
    :host ::ng-deep .mat-mdc-card {
      --mdc-elevated-card-container-color: #f8f6f2;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
    }

    :host ::ng-deep mat-card-content {
      padding: 0 !important;
    }

    .card-row {
      display: flex;
      align-items: stretch;
    }

    .card-image {
      width: 28%;
      min-height: 100%;
      flex-shrink: 0;
      object-fit: cover;
      background-color: #fff;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.625rem;
      min-width: 0;
      padding: 1rem 1.25rem;
    }

    .card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .card-info {
      min-width: 0;
    }

    .product-name {
      font-size: 1.0625rem;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      margin: 0;
    }

    .product-price {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #2d6a2d;
      margin: 0.1875rem 0 0;
    }

    .product-qty {
      font-size: 0.8125rem;
      color: #6b7280;
      margin: 0.25rem 0 0;
    }

    .product-total {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a1a1a;
      white-space: nowrap;
      margin: 0;
    }

    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 0.125rem;
    }

    .qty-field {
      width: 8rem;
    }

    :host ::ng-deep .qty-field .mdc-notched-outline__leading {
      border-radius: 999px 0 0 999px !important;
      width: 18px !important;
    }

    :host ::ng-deep .qty-field .mdc-notched-outline__trailing {
      border-radius: 0 999px 999px 0 !important;
    }

    :host ::ng-deep .qty-field .mdc-notched-outline__leading,
    :host ::ng-deep .qty-field .mdc-notched-outline__trailing,
    :host ::ng-deep .qty-field .mdc-notched-outline__notch {
      border-color: #d5d0c8;
    }

    :host ::ng-deep .qty-field .mat-mdc-text-field-wrapper {
      padding: 0 0.75rem;
    }

    :host ::ng-deep .qty-field .mat-mdc-form-field-infix {
      padding: 0.3rem 0;
      min-height: 2rem;
      width: auto;
      flex: 0 0 auto;
    }

    :host ::ng-deep .qty-field .mat-mdc-form-field-flex {
      align-items: center;
      gap: 0;
    }

    :host ::ng-deep .qty-field input {
      font-size: 0.875rem;
      font-weight: 500;
      width: 1.5rem;
    }

    :host ::ng-deep .qty-field input[type='number']::-webkit-outer-spin-button,
    :host ::ng-deep .qty-field input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    :host ::ng-deep .qty-field input[type='number'] {
      -moz-appearance: textfield;
    }

    .unit-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1a1a1a;
      margin-left: -0.125rem;
    }

    .qty-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: #aaa;
    }

    .add-btn {
      border-radius: 0.625rem;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      padding: 0 1.25rem;
    }

    :host ::ng-deep .remove-btn.mdc-button--outlined {
      border-radius: 0.625rem;
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0 1.25rem;
      color: #c62828 !important;
      border-color: #c62828 !important;
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
