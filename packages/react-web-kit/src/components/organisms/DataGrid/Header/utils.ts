import { SortState } from '../types';

export const NEXT_STATE: { [key: string]: SortState } = {
  unsorted: 'ascending',
  ascending: 'descending',
  descending: 'unsorted',
  initial: 'unsorted',
};

export const getIconSuffix = (state: SortState): string =>
  state === 'unsorted' ? 'ascending' : state;

export const getIconColor = (state: SortState): 'medium' | 'orange' =>
  state === 'unsorted' ? 'medium' : 'orange';

export const findUnselectedItemsOnData = <T>(
  selected: T[],
  data: T[],
  rowKeyExtractor: (t: T) => string
): T[] =>
  selected.length > 0
    ? data.filter(item =>
        selected.every(
          rowData => rowKeyExtractor(rowData) !== rowKeyExtractor(item)
        )
      )
    : [];

export const findCurrentItemsOnData = <T>(
  selected: T[],
  data: T[],
  rowKeyExtractor: (t: T) => string
): T[] =>
  selected.length > 0
    ? selected.filter(item =>
        data.some(rowData => rowKeyExtractor(rowData) === rowKeyExtractor(item))
      )
    : [];
