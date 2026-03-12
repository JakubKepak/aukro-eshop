import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop-list/shop-list').then(m => m.ShopListComponent),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./pages/basket/basket').then(m => m.BasketComponent),
  },
];
