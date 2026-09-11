import {
  findValue,
  getMultiLabel,
  getSingleLabel,
  isMap,
  isOptionChecked,
  mapToArray,
  multiBuilder,
  singleBuilder,
} from './functions';

type Item = { id: number; label: string };

const keyExtractor = (i: Item) => String(i.id);
const labelExtractor = (i: Item) => i.label;

describe('Select functions', () => {
  it('findValue matches by keyExtractor', () => {
    const items = [{ id: 1, label: 'a' }, { id: 2, label: 'b' }];
    expect(findValue(items, { id: 2, label: 'x' }, keyExtractor)).toEqual({
      id: 2,
      label: 'b',
    });
  });

  it('isOptionChecked for single marks only the selected item', () => {
    const selected = [{ id: 1, label: 'a' }];
    expect(isOptionChecked('single', { id: 1, label: 'a' }, selected, keyExtractor, 0)).toBe(
      true
    );
    expect(isOptionChecked('single', { id: 2, label: 'b' }, selected, keyExtractor, 0)).toBe(
      false
    );
  });

  it('isOptionChecked for multi matches any selected', () => {
    const selected = [{ id: 1, label: 'a' }, { id: 3, label: 'c' }];
    expect(isOptionChecked('multi', { id: 3, label: 'c' }, selected, keyExtractor, 0)).toBe(
      true
    );
    expect(isOptionChecked('multi', { id: 2, label: 'b' }, selected, keyExtractor, 0)).toBe(
      false
    );
  });

  it('multiBuilder toggles an option on/off', () => {
    const selected = [{ id: 1, label: 'a' }];
    const added = multiBuilder({ id: 2, label: 'b' }, selected, keyExtractor);
    expect(added).toEqual([
      { id: 1, label: 'a' },
      { id: 2, label: 'b' },
    ]);
    const removed = multiBuilder({ id: 1, label: 'a' }, added, keyExtractor);
    expect(removed).toEqual([{ id: 2, label: 'b' }]);
  });

  it('singleBuilder selects or deselects', () => {
    const selected = [{ id: 1, label: 'a' }];
    expect(singleBuilder({ id: 2, label: 'b' }, selected, keyExtractor)).toEqual([
      { id: 2, label: 'b' },
    ]);
    expect(singleBuilder({ id: 1, label: 'a' }, selected, keyExtractor)).toEqual([]);
  });

  it('isMap detects Maps', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap([])).toBe(false);
  });

  it('mapToArray flattens map values', () => {
    const map = new Map([
      ['a', [{ id: 1, label: 'a' }]],
      ['b', [{ id: 2, label: 'b' }]],
    ]);
    expect(mapToArray(map)).toEqual([
      { id: 1, label: 'a' },
      { id: 2, label: 'b' },
    ]);
  });

  it('getSingleLabel resolves label from options or value', () => {
    const options: Item[] = [
      { id: 1, label: 'Alpha' },
      { id: 2, label: 'Beta' },
    ];
    expect(getSingleLabel({ id: 1, label: 'Alpha' }, 'placeholder', options, keyExtractor, labelExtractor)).toBe(
      'Alpha'
    );
    expect(getSingleLabel(null, 'placeholder', options, keyExtractor, labelExtractor)).toBe(
      'placeholder'
    );
    expect(
      getSingleLabel({ id: 9, label: 'Unknown' }, 'p', [], keyExtractor, labelExtractor)
    ).toBe('Unknown');
  });

  it('getMultiLabel joins selected labels', () => {
    const options: Item[] = [
      { id: 1, label: 'Alpha' },
      { id: 2, label: 'Beta' },
      { id: 3, label: 'Gamma' },
    ];
    expect(
      getMultiLabel(
        [{ id: 1, label: 'Alpha' }, { id: 3, label: 'Gamma' }],
        'placeholder',
        options,
        keyExtractor,
        labelExtractor
      )
    ).toBe('Alpha, Gamma');
    expect(getMultiLabel([], 'placeholder', options, keyExtractor, labelExtractor)).toBe(
      'placeholder'
    );
  });
});
