import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService, LANGUAGES } from '../../services/language.service';
import { CurrencyService, CURRENCIES } from '../../services/currency.service';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary" class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-1">
        <a
          mat-button
          routerLink="/shop"
          routerLinkActive="active-link"
          class="!text-white"
        >
          <mat-icon>storefront</mat-icon>
          <span class="ml-1 hidden sm:inline">Shop</span>
        </a>
        <a
          mat-button
          routerLink="/basket"
          routerLinkActive="active-link"
          class="!text-white"
        >
          <mat-icon>shopping_cart</mat-icon>
          <span class="ml-1 hidden sm:inline">Basket</span>
        </a>
      </div>

      <div class="flex items-center gap-2">
        <mat-form-field appearance="outline" class="compact-select">
          <mat-select
            [value]="languageService.language()"
            (selectionChange)="languageService.setLanguage($event.value)"
          >
            @for (lang of languages; track lang.code) {
              <mat-option [value]="lang.code">{{ lang.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="compact-select">
          <mat-select
            [value]="currencyService.currency()"
            (selectionChange)="currencyService.setCurrency($event.value)"
          >
            @for (curr of currencies; track curr.code) {
              <mat-option [value]="curr.code">{{ curr.symbol }} {{ curr.code }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>
    </mat-toolbar>

    <main class="p-4">
      <ng-content />
    </main>
  `,
  styles: `
    .compact-select {
      width: 7rem;

      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }

      ::ng-deep .mdc-text-field--outlined {
        --mdc-outlined-text-field-container-shape: 8px;
        --mdc-outlined-text-field-outline-color: rgba(255, 255, 255, 0.5);
        --mdc-outlined-text-field-focus-outline-color: white;
        --mat-select-trigger-text-color: white;
        --mat-select-enabled-arrow-color: white;
      }
    }

    .active-link {
      background: rgba(255, 255, 255, 0.15);
    }
  `,
})
export class LayoutComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly currencyService = inject(CurrencyService);
  protected readonly languages = LANGUAGES;
  protected readonly currencies = CURRENCIES;
}
