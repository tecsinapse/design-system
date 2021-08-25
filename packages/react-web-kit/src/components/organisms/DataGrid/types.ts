import React from 'react';

export type HeadersType<Data> = {
  /** Column header label */
  label: string;
  /** Table cell renderer */
  render: (data: Data) => React.ReactNode;
  sort?: (direction: 'ascending' | 'descending' | 'unsorted') => void;
};
