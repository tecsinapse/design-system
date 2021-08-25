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
