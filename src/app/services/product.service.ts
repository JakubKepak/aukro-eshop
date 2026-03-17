import { computed, inject, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ApiOffer, ApiOffersResponse } from '../models/api-offer.model';
import { CurrencyService } from './currency.service';

const OFFER_IDS = [
  7076190539, 7087376758, 7087202839, 7079604952, 7086686044,
  7086829246, 7086469857, 7086405806, 7086269719, 6986190712,
  7086708273, 7086632118, 7086307306, 7086406787,
];

function mapApiOffer(offer: ApiOffer): Product {
  const name = offer.name;
  const image =
    offer.images?.lists?.medium?.[0]?.url ??
    offer.images?.lists?.small?.[0]?.url ??
    'assets/images/placeholder.svg';
  return {
    id: `api-${offer.id}`,
    name: { cs: name, sk: name, en: name },
    priceCzk: offer.buyNowPrice.amount, // overwritten by products computed()
    priceApi: offer.buyNowPrice.amount,
    unit: 'ks',
    image,
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly currencyService = inject(CurrencyService);

  // Aukro API only supports CZK and EUR — fall back to CZK for GBP
  private readonly apiCurrency = computed(() => {
    const currency = this.currencyService.currency();
    return currency === 'GBP' ? 'CZK' as const : currency;
  });

  private readonly apiRate = computed(() =>
    this.apiCurrency() === 'CZK' ? 1 : this.currencyService.rate(),
  );

  private readonly resource = httpResource<Product[]>(
    () => `/api/aukro/offers/carouselOffers?ids=${OFFER_IDS.join(',')}&currency=${this.apiCurrency()}`,
    {
      defaultValue: [] as Product[],
      parse: (raw) => {
        const res = raw as ApiOffersResponse;
        return (res.content ?? []).map(mapApiOffer);
      },
    },
  );

  /** Products with price converted to CZK (base currency for the app) */
  readonly products = computed(() =>
    this.resource.value().map((p) => ({
      ...p,
      priceCzk: p.priceApi / this.apiRate(),
    })),
  );
}
