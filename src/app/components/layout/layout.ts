import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService, LANGUAGES } from '../../services/language.service';
import { CurrencyService, CURRENCIES } from '../../services/currency.service';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3">
        <nav>
          <mat-button-toggle-group hideSingleSelectionIndicator>
            <mat-button-toggle
              routerLink="/shop"
              routerLinkActive="mat-button-toggle-checked"
            >
              Shop list
            </mat-button-toggle>
            <mat-button-toggle
              routerLink="/basket"
              routerLinkActive="mat-button-toggle-checked"
            >
              Basket
            </mat-button-toggle>
          </mat-button-toggle-group>
        </nav>

        <div class="flex items-center gap-2">
          <mat-form-field appearance="outline" class="header-select">
            <mat-select
              [value]="languageService.language()"
              (selectionChange)="languageService.setLanguage($event.value)"
            >
              @for (lang of languages; track lang.code) {
                <mat-option [value]="lang.code">{{ lang.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="header-select">
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
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <ng-content />
    </main>
  `,
  styles: `
    :host {
      display: block;
    }

    .header-select {
      width: 7.5rem;

      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }

      ::ng-deep .mat-mdc-text-field-wrapper {
        height: 40px;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        min-height: unset;
      }
    }
  `,
})
export class LayoutComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly currencyService = inject(CurrencyService);
  protected readonly languages = LANGUAGES;
  protected readonly currencies = CURRENCIES;
}
