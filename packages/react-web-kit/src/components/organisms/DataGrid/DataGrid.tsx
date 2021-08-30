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
  /** Enable rows selection */
  selectable?: boolean;
  /** Selected items */
  selected?: Data[];
  /** Selection handler */
  onSelected?: (data: Data, checked: boolean) => void;
  /** Select all handler */
  onSelectAll?: () => void;
  /** Shows pagination controls */
  pagination?: boolean;
  /** Results per page */
  rowsPerPage?: number;
  /** Results per page handler */
  onRowsPerPageChange?: (value: number) => void;
  rowsPerPageOptions?: number[];
  rowsPerPageLabel?: (value: number) => string;
  /** Export button label */
  exportLabel?: string;
  exportFunction?: () => void;
  /** Total data elements */
  rowsCount?: number;
  /** Current page. Always start in 0 */
  page?: number;
  /** Current page handler */
  onPageChange?: (page: number) => void;
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
  onSelected,
  onSelectAll,
  pagination = false,
  rowsPerPage = 10,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50],
  rowsPerPageLabel = value => `Exibir por página: ${value} itens`,
  exportLabel = 'Exportar',
  exportFunction,
  rowsCount,
  page = 0,
  onPageChange,
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
          onSelectAll={onSelectAll}
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
                    onChange={checked => onSelected?.(item, checked)}
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
          exportFunction={exportFunction}
          exportLabel={exportLabel}
          rowsPerPageLabel={rowsPerPageLabel}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsCount={rowsCount ?? data.length}
          page={page}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
