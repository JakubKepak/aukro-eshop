import { inject, Injectable } from '@angular/core';
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

  readonly products = this.apiProducts;
}
