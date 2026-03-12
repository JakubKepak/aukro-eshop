import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shop-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold">Shop List</h2>
      <p class="text-gray-600 mt-2">Products will appear here.</p>
    </div>
  `,
})
export class ShopListComponent {}
