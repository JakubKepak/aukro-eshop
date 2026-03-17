export interface Product {
  id: string;
  name: Record<'cs' | 'sk' | 'en', string>;
  priceCzk: number;
  /** Raw price from API before CZK conversion */
  priceApi: number;
  unit: string;
  image: string;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}
