/** Returns the correct plural translation key for Czech/Slovak/English */
export function pluralKey(base: string, count: number): string {
  if (count === 1) return `${base}.one`;
  if (count >= 2 && count <= 4) return `${base}.few`;
  return `${base}.many`;
}

export const TRANSLATIONS: Record<string, Record<'cs' | 'sk' | 'en', string>> = {
  'nav.shop': {
    cs: 'Obchod',
    sk: 'Obchod',
    en: 'Shop list',
  },
  'nav.basket': {
    cs: 'Košík',
    sk: 'Košík',
    en: 'Basket',
  },
  'shop.title': {
    cs: 'Obchod',
    sk: 'Obchod',
    en: 'Shoplist',
  },
  'basket.title': {
    cs: 'Košík',
    sk: 'Košík',
    en: 'Basket',
  },
  'basket.empty': {
    cs: 'Váš košík je prázdný.',
    sk: 'Váš košík je prázdny.',
    en: 'Your basket is empty.',
  },
  'product.addToBasket': {
    cs: 'Do košíku',
    sk: 'Do košíka',
    en: 'Add to basket',
  },
  'common.remove': {
    cs: 'Odebrat',
    sk: 'Odstrániť',
    en: 'Remove',
  },
  'order.summary': {
    cs: 'Souhrn objednávky',
    sk: 'Súhrn objednávky',
    en: 'Order summary',
  },
  'order.subtotal': {
    cs: 'Mezisoučet',
    sk: 'Medzisúčet',
    en: 'Subtotal',
  },
  'order.shipping': {
    cs: 'Doprava',
    sk: 'Doprava',
    en: 'Shipping',
  },
  'order.tax': {
    cs: 'DPH (21 %)',
    sk: 'DPH (21 %)',
    en: 'Tax (21%)',
  },
  'order.total': {
    cs: 'Celkem',
    sk: 'Celkom',
    en: 'Total',
  },
  'common.item.one': {
    cs: 'položka',
    sk: 'položka',
    en: 'item',
  },
  'common.item.few': {
    cs: 'položky',
    sk: 'položky',
    en: 'items',
  },
  'common.item.many': {
    cs: 'položek',
    sk: 'položiek',
    en: 'items',
  },
};
