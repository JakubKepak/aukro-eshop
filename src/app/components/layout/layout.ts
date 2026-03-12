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
    <header class="header">
      <div class="header-inner">
        <div class="header-spacer"></div>

        <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="nav-bar">
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

        <div class="header-selectors">
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
      <main class="main-content">
        <ng-content />
      </main>
    </mat-tab-nav-panel>
  `,
  styles: `
    :host {
      display: block;
    }

    .header {
      background: white;
    }

    .header-inner {
      max-width: 64rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem 0;
    }

    .header-spacer {
      flex: 1;
    }

    .nav-bar {
      border-bottom: none;
    }

    .header-selectors {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
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

    .main-content {
      max-width: 64rem;
      margin: 0 auto;
      padding: 1.5rem 1rem;
    }
  `,
})
export class LayoutComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly currencyService = inject(CurrencyService);
  protected readonly languages = LANGUAGES;
  protected readonly currencies = CURRENCIES;
}
