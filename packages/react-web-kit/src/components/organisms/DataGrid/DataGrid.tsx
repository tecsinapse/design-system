import React from 'react';
import { Checkbox } from '@tecsinapse/react-core';
import {
  Table,
  TableToolbar,
  TableContainer,
  Tr,
  Td,
  TBody,
} from '../../atoms/Table';
import { CheckboxCell } from './styled';
import { Header } from './Header';
import { HeadersType } from './types';
import { Footer } from './Footer';

export interface DataGridProps<Data> {
  headers: HeadersType<Data>[];
  data: Data[];
  /** Unique identifier for row data */
  rowKeyExtractor: (data: Data) => string;
  toolbarRightIcons?: React.ReactNode;
  toolbarFooter?: React.ReactNode;
  toolbarTitle: string;
  selectable?: boolean;
  /** Selected items */
  selected?: Data[];
  /** Selection handler */
  setSelected?: (data: Data, checked: boolean) => void;
  /** Select all handler */
  setSelectAll?: () => void;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  rowsPerPageLabel?: (value: number) => string;
  exportLabel?: string;
  exportFunction?: () => void;
}

const DataGrid = <Data extends unknown>({
  headers,
  data,
  rowKeyExtractor,
  toolbarTitle,
  toolbarFooter,
  toolbarRightIcons,
  selectable = false,
  selected = [],
  setSelected,
  setSelectAll,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50],
  rowsPerPageLabel = value => `Exibir por página: ${value} itens`,
  exportLabel = 'Exportar',
  exportFunction,
}: DataGridProps<Data>): JSX.Element => {
  return (
    <TableContainer>
      <TableToolbar
        title={toolbarTitle}
        rightIcons={toolbarRightIcons}
        footer={toolbarFooter}
      />
      <Table>
        <Header
          selectable={selectable}
          setSelectAll={setSelectAll}
          headers={headers}
          dataLenght={data.length}
          selectedLenght={selected?.length}
        />

        <TBody>
          {data.map(item => (
            <Tr key={rowKeyExtractor(item)}>
              {selectable && (
                <CheckboxCell>
                  <Checkbox
                    checked={selected?.some(
                      sel => rowKeyExtractor(sel) === rowKeyExtractor(item)
                    )}
                    onChange={checked => setSelected?.(item, checked)}
                  />
                </CheckboxCell>
              )}
              {headers.map(({ label, render }) => (
                <Td key={`row-${rowKeyExtractor(item)}-column-${label}`}>
                  {render(item)}
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>

        <Footer
            // TODO: Add external controls for pagination
          exportFunction={exportFunction}
          exportLabel={exportLabel}
          rowsPerPageLabel={rowsPerPageLabel}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          dataLenght={data.length}
        />
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
