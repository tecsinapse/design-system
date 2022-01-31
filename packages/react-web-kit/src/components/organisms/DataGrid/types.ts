import React from 'react';

export type SortState = 'ascending' | 'descending' | 'unsorted';

export type HeadersType<Data> = {
  /** Column header label */
  label: string;
  /** Table cell renderer */
  render: (data: Data) => React.ReactNode;
  sort?: (direction: SortState) => void;
  /** Header alignment */
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
};
