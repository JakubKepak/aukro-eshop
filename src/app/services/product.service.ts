import { computed, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiOffer, ApiOffersResponse } from '../models/api-offer.model';
import { CurrencyCode, CurrencyService } from './currency.service';

const OFFER_IDS = [
  7076190539, 7087376758, 7087202839, 7079604952, 7086686044,
  7086829246, 7086469857, 7086405806, 7086269719, 6986190712,
  7086708273, 7086632118, 7086307306, 7086406787,
];

function buildApiUrl(currency: CurrencyCode): string {
  return `/api/aukro/offers/carouselOffers?ids=${OFFER_IDS.join(',')}&currency=${currency}`;
}

const LOCAL_PRODUCTS: Product[] = [
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

function mapApiOffer(offer: ApiOffer, rate: number): Product {
  const name = offer.name;
  const image =
    offer.images?.lists?.medium?.[0]?.url ??
    offer.images?.lists?.small?.[0]?.url ??
    'assets/images/placeholder.svg';
  return {
    id: `api-${offer.id}`,
    name: { cs: name, sk: name, en: name },
    priceCzk: offer.buyNowPrice.amount / rate,
    unit: 'ks',
    image,
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly currencyService = inject(CurrencyService);

  private readonly apiProducts = toSignal(
    toObservable(this.currencyService.currency).pipe(
      switchMap((currency) => {
        // GBP not supported by Aukro API — fetch in CZK and convert client-side
        const apiCurrency = currency === 'GBP' ? 'CZK' : currency;
        const rate = apiCurrency === 'CZK' ? 1 : this.currencyService.rate();
        return this.http.get<ApiOffersResponse>(buildApiUrl(apiCurrency)).pipe(
          map((res) => (res.content ?? []).map((offer) => mapApiOffer(offer, rate))),
          catchError(() => of([] as Product[])),
        );
      }),
    ),
    { initialValue: [] as Product[] },
  );

  readonly products = computed(() => [...LOCAL_PRODUCTS, ...this.apiProducts()]);
}
