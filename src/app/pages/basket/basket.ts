import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-light">
        Basket
        <span class="text-base text-gray-400 ml-2">0 items</span>
      </h1>
    </div>
    <p class="text-gray-500">Your basket is empty.</p>
  `,
})
export class BasketComponent {}
