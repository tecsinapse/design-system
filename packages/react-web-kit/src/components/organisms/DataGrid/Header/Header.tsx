import React from 'react';
import { Checkbox, Icon, PressableSurface } from '@tecsinapse/react-core';
import { Th, THead, Tr } from '../../../atoms/Table';
import { CheckboxHeader } from './styled';
import { HeadersType } from '../types';
import { getIconColor, getIconSuffix, NEXT_STATE } from './utils';

export interface DataGridHeaderProps<Data> {
  headers: HeadersType<Data>[];
  dataLenght: number;
  selectable?: boolean;
  selectedLenght?: number;
  setSelectAll?: () => void;
}

const Header = <Data extends unknown>({
  selectable,
  dataLenght,
  selectedLenght,
  setSelectAll,
  headers,
}: DataGridHeaderProps<Data>): JSX.Element => {
  const [sortDirection, setSortDirection] = React.useState<string>(
    NEXT_STATE.initial
  );

  const handleSortDirection = sort => {
    sort(NEXT_STATE[sortDirection]);
    setSortDirection(NEXT_STATE[sortDirection]);
  };

  return (
    <THead>
      <Tr>
        {selectable && (
          <CheckboxHeader>
            <Checkbox
              checked={dataLenght === selectedLenght}
              onChange={() => setSelectAll?.()}
            />
          </CheckboxHeader>
        )}
        {headers.map(({ label, sort }) => (
          <Th key={label}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
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
