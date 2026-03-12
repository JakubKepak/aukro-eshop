import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: { cs: 'Rajče Heirloom', sk: 'Rajčina Heirloom', en: 'Heirloom tomato' },
    priceCzk: 149.90,
    unit: 'lb',
    image: 'assets/images/tomato.svg',
  },
  {
    id: '2',
    name: { cs: 'Brambora', sk: 'Zemiak', en: 'Other potato' },
    priceCzk: 149.90,
    unit: 'lb',
    image: 'assets/images/potato.svg',
  },
  {
    id: '3',
    name: { cs: 'Bio zázvor', sk: 'Bio zázvor', en: 'Organic ginger' },
    priceCzk: 324.90,
    unit: 'lb',
    image: 'assets/images/ginger.svg',
  },
  {
    id: '4',
    name: { cs: 'Zázvor', sk: 'Zázvor', en: 'Other ginger' },
    priceCzk: 324.90,
    unit: 'lb',
    image: 'assets/images/ginger2.svg',
  },
  {
    id: '5',
    name: { cs: 'Sladká cibule', sk: 'Sladká cibuľa', en: 'Sweet onion' },
    priceCzk: 74.90,
    unit: 'lb',
    image: 'assets/images/onion.svg',
  },
  {
    id: '6',
    name: { cs: 'Cibule', sk: 'Cibuľa', en: 'Other onion' },
    priceCzk: 74.90,
    unit: 'lb',
    image: 'assets/images/onion2.svg',
  },
  {
    id: '7',
    name: { cs: 'Červený pepř', sk: 'Červená paprika', en: 'Red pepper' },
    priceCzk: 89.90,
    unit: 'lb',
    image: 'assets/images/pepper.svg',
  },
  {
    id: '8',
    name: { cs: 'Mrkev', sk: 'Mrkva', en: 'Carrot' },
    priceCzk: 49.90,
    unit: 'lb',
    image: 'assets/images/carrot.svg',
  },
  {
    id: '9',
    name: { cs: 'Brokolice', sk: 'Brokolica', en: 'Broccoli' },
    priceCzk: 99.90,
    unit: 'lb',
    image: 'assets/images/broccoli.svg',
  },
  {
    id: '10',
    name: { cs: 'Špenát', sk: 'Špenát', en: 'Spinach' },
    priceCzk: 119.90,
    unit: 'lb',
    image: 'assets/images/spinach.svg',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = signal<Product[]>(PRODUCTS);
}
