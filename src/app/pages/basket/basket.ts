import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold">Basket</h2>
      <p class="text-gray-600 mt-2">Your basket items will appear here.</p>
    </div>
  `,
})
export class BasketComponent {}
