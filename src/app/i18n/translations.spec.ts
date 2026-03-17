import { pluralKey } from './translations';

describe('pluralKey', () => {
  it('should return .one for count 1', () => {
    expect(pluralKey('common.item', 1)).toBe('common.item.one');
  });

  it('should return .few for counts 2-4', () => {
    expect(pluralKey('common.item', 2)).toBe('common.item.few');
    expect(pluralKey('common.item', 3)).toBe('common.item.few');
    expect(pluralKey('common.item', 4)).toBe('common.item.few');
  });

  it('should return .many for counts 5+', () => {
    expect(pluralKey('common.item', 5)).toBe('common.item.many');
    expect(pluralKey('common.item', 10)).toBe('common.item.many');
    expect(pluralKey('common.item', 100)).toBe('common.item.many');
  });

  it('should return .many for count 0', () => {
    expect(pluralKey('common.item', 0)).toBe('common.item.many');
  });
});
