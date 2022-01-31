import React from 'react';
import { Checkbox, Icon, PressableSurface } from '@tecsinapse/react-core';
import { Th, THead, Tr } from '../../../atoms/Table';
import { CheckboxHeader } from './styled';
import { HeadersType, SortState } from '../types';
import {
  findCurrentItemsOnData,
  findUnselectedItemsOnData,
  getIconColor,
  getIconSuffix,
  NEXT_STATE,
} from './utils';

export interface DataGridHeaderProps<Data> {
  headers: HeadersType<Data>[];
  data: Data[];
  selectedRows: Data[];
  onSelected?: (data: Data[]) => void;
  rowKeyExtractor: (data: Data) => string;
  rowsCount: number;
  selectable?: boolean;
}

const Header = <Data extends unknown>({
  selectable,
  rowsCount,
  headers,
  data,
  rowKeyExtractor,
  selectedRows,
  onSelected,
}: DataGridHeaderProps<Data>): JSX.Element => {
  const [sortDirection, setSortDirection] = React.useState<SortState>(
    NEXT_STATE.initial
  );

  const handleSortDirection = sort => {
    sort(NEXT_STATE[sortDirection]);
    setSortDirection(NEXT_STATE[sortDirection]);
  };

  const handleSelectAll = checked => {
    if (!checked) {
      onSelected?.([]);
      return;
    }

    const currentItemsOnData = findCurrentItemsOnData(
      selectedRows,
      data,
      rowKeyExtractor
    );

    const unselectedItemsOnData = findUnselectedItemsOnData(
      selectedRows,
      data,
      rowKeyExtractor
    );

    if (checked && selectedRows.length < 1) {
      onSelected?.(data);
      return;
    }
    if (checked && currentItemsOnData.length < 1) {
      onSelected?.(unselectedItemsOnData.concat(selectedRows));
      return;
    }
    onSelected?.(selectedRows.concat(unselectedItemsOnData));
  };

  return (
    <THead>
      <Tr>
        {selectable && (
          <CheckboxHeader>
            <Checkbox
              checked={rowsCount === selectedRows?.length}
              onChange={handleSelectAll}
            />
          </CheckboxHeader>
        )}
        {headers.map(({ label, sort, justifyContent = 'flex-start' }) => (
          <Th key={label}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent,
              }}
            >
              {label}
              {sort && (
                <div style={{ marginLeft: 8 }}>
                  <PressableSurface onPress={() => handleSortDirection(sort)}>
                    <Icon
                      name={`sort-alphabetical-${getIconSuffix(sortDirection)}`}
                      type={'material-community'}
                      fontColor={getIconColor(sortDirection)}
                    />
                  </PressableSurface>
                </div>
              )}
            </div>
          </Th>
        ))}
      </Tr>
    </THead>
  );
};

export default Header;
