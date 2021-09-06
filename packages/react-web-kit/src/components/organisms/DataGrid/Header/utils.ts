export const NEXT_STATE = {
  unsorted: 'ascending',
  ascending: 'descending',
  descending: 'unsorted',
  initial: 'unsorted',
};

export const getIconSuffix = state =>
  state === 'unsorted' ? 'ascending' : state;

export const getIconColor = state =>
  state === 'unsorted' ? 'medium' : 'orange';

export const findUnselectedItemsOnData = (selected, data, rowKeyExtractor) =>
  selected.length > 0
    ? data.filter(item =>
        selected.every(
          rowData => rowKeyExtractor(rowData) !== rowKeyExtractor(item)
        )
      )
    : [];

export const findCurrentItemsOnData = (selected, data, rowKeyExtractor) =>
  selected.length > 0
    ? selected.filter(item =>
        data.some(rowData => rowKeyExtractor(rowData) === rowKeyExtractor(item))
      )
    : [];
