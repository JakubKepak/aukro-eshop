interface ApiPrice {
  amount: number;
  currency: string;
}

interface ApiImage {
  position: number;
  titleImage: boolean;
  url: string;
  size: string;
}

export interface ApiOffer {
  id: number;
  name: string;
  status: string;
  buyNowPrice: ApiPrice;
  images: {
    lists: {
      medium?: ApiImage[];
      small?: ApiImage[];
      original?: ApiImage[];
    };
  };
}

export interface ApiOffersResponse {
  content: ApiOffer[];
}
