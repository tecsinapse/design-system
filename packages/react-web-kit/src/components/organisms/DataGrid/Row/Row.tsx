import React from 'react';
import { Checkbox } from '@tecsinapse/react-core';
import { CheckboxCell } from '../styled';
import { Td, Tr } from '../../../atoms/Table';

const Row = ({
  rowKeyExtractor,
  data,
  checked: _checked,
  handleSelect,
  selectable,
  headers,
}) => {
  return (
    <Tr key={rowKeyExtractor(data)}>
      {selectable && (
        <CheckboxCell>
          <Checkbox
            checked={_checked}
            onChange={checked => handleSelect(data, checked)}
          />
        </CheckboxCell>
      )}
      {headers.map(({ label, render }) => (
        <Td key={`row-${rowKeyExtractor(data)}-column-${label}`}>
          {render(data)}
        </Td>
      ))}
    </Tr>
  );
};

export default React.memo(Row);
