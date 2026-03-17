import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService, LANGUAGES } from '../../services/language.service';
import { CurrencyService, CURRENCIES } from '../../services/currency.service';
import { BasketService } from '../../services/basket.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslatePipe,
  ],
  template: `
    <header class="bg-white">
      <div class="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 pt-3 sm:flex-row sm:justify-between">
        <!-- Invisible spacer: balances the selectors on the right so nav tabs stay centered -->
        <div class="hidden flex-1 sm:block"></div>

        <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="nav-bar">
          <a
            mat-tab-link
            routerLink="/shop"
            routerLinkActive
            #shopLink="routerLinkActive"
            [active]="shopLink.isActive"
          >
            {{ 'nav.shop' | translate }}
          </a>
          <a
            mat-tab-link
            routerLink="/basket"
            routerLinkActive
            #basketLink="routerLinkActive"
            [active]="basketLink.isActive"
          >
            {{ 'nav.basket' | translate }} @if (basketBadge(); as badge) {
              ({{ badge }})
            }
          </a>
        </nav>

        <div class="header-selectors flex flex-1 items-center justify-end gap-2">
          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="w-28"
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
            class="w-28"
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
    .nav-bar {
      border-bottom: none;
    }

    .header-selectors {
      --mat-form-field-container-height: 36px;
      --mat-form-field-container-vertical-padding: 6px;
    }
  `,
})
export class LayoutComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly currencyService = inject(CurrencyService);
  protected readonly languages = LANGUAGES;
  protected readonly currencies = CURRENCIES;
  protected readonly basketService = inject(BasketService);
  protected readonly basketBadge = computed(() => {
    const count = this.basketService.itemCount();
    return count > 0 ? count : null;
  });
}
