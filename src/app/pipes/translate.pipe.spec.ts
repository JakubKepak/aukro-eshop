import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  const pipe = new TranslatePipe();

  it('should translate a known key', () => {
    expect(pipe.transform('nav.shop', 'cs')).toBe('Obchod');
    expect(pipe.transform('nav.shop', 'en')).toBe('Shop list');
  });

  it('should return the key when not found', () => {
    expect(pipe.transform('unknown.key', 'cs')).toBe('unknown.key');
  });

  it('should translate for all supported languages', () => {
    expect(pipe.transform('basket.empty', 'cs')).toBe('Váš košík je prázdný.');
    expect(pipe.transform('basket.empty', 'sk')).toBe('Váš košík je prázdny.');
    expect(pipe.transform('basket.empty', 'en')).toBe('Your basket is empty.');
  });
});
