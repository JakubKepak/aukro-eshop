import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
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
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `
    <header class="bg-white">
      <div class="mx-auto max-w-5xl flex items-center justify-between px-4 pt-3">
        <div class="flex-1"></div>

        <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="border-0!">
          <a
            mat-tab-link
            routerLink="/shop"
            routerLinkActive
            #shopLink="routerLinkActive"
            [active]="shopLink.isActive"
          >
            Shop list
          </a>
          <a
            mat-tab-link
            routerLink="/basket"
            routerLinkActive
            #basketLink="routerLinkActive"
            [active]="basketLink.isActive"
          >
            Basket
          </a>
        </nav>

        <div class="flex-1 flex items-center justify-end gap-2">
          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="header-select"
          >
            <mat-select
              [value]="languageService.language()"
              (selectionChange)="languageService.setLanguage($event.value)"
            >
              @for (lang of languages; track lang.code) {
                <mat-option [value]="lang.code">{{ lang.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="header-select"
          >
            <mat-select
              [value]="currencyService.currency()"
              (selectionChange)="currencyService.setCurrency($event.value)"
            >
              @for (curr of currencies; track curr.code) {
                <mat-option [value]="curr.code">
                  {{ curr.symbol }} {{ curr.code }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </header>

    <mat-tab-nav-panel #tabPanel>
      <main class="mx-auto max-w-5xl px-4 py-6">
        <ng-content />
      </main>
    </mat-tab-nav-panel>
  `,
  styles: `
    :host {
      display: block;
    }

    .header-select {
      width: 7rem;

      ::ng-deep .mat-mdc-text-field-wrapper {
        height: 36px;
        padding: 0 8px;
      }

      ::ng-deep .mat-mdc-form-field-infix {
        padding: 6px 0 !important;
        min-height: 36px;
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
