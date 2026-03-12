import { computed, Injectable, signal } from '@angular/core';
import { BasketItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  readonly items = signal<BasketItem[]>([]);
  readonly itemCount = computed(() => this.items().length);

  readonly subtotalCzk = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.priceCzk * item.quantity,
      0,
    ),
  );

  addItem(product: Product, quantity: number): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeItem(productId: string): void {
    this.items.update((items) =>
      items.filter((i) => i.product.id !== productId),
    );
  }
}
