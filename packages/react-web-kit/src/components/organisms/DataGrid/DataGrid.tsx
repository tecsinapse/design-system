import React, { CSSProperties } from 'react';
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
import { Skeleton } from '../../atoms/Skeleton';
import { getData, removeElement } from './utils';

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
  selectedRows?: Data[];
  /** Selection handler */
  onSelectedRows?: (data: Data[]) => void;
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
  /** Total data elements. Only specify this property if your data is server-side */
  rowsCount?: number;
  /** Current page. Always start in 0 */
  page?: number;
  /** Current page handler */
  onPageChange?: (page: number) => void;
  /** Loading state. The amount of skeleton rows is based on current rowsPerPage */
  loading?: boolean;
  /** Custom skeleton component for better visual */
  skeletonComponent?: React.ReactNode;
  /** CSS style spread to TableContainer */
  style?: CSSProperties;
}

const DataGrid = <Data extends unknown>({
  headers,
  data,
  rowKeyExtractor,
  toolbarTitle,
  toolbarFooter,
  toolbarRightIcons,
  selectable = false,
  selectedRows = [],
  onSelectedRows,
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
  loading = false,
  skeletonComponent,
  style,
}: DataGridProps<Data>): JSX.Element => {
  if (selectable && (!selectedRows || !onSelectedRows)) {
    throw new Error(
      '[DataGrid] You should specify selection handlers (selectedRows, onSelectedRows)'
    );
  }

  const handleSelect = (current, checked) => {
    if (checked) {
      onSelectedRows?.([...selectedRows, current]);
      return;
    }
    const idx = selectedRows.findIndex(
      el => rowKeyExtractor(el) === rowKeyExtractor(current)
    );
    onSelectedRows?.([...removeElement(selectedRows, idx)]);
  };

  return (
    <TableContainer style={style}>
      <TableToolbar
        title={toolbarTitle}
        rightIcons={toolbarRightIcons}
        footer={toolbarFooter}
      />
      <Table>
        <Header
          selectable={selectable}
          headers={headers}
          data={data}
          rowsCount={rowsCount ?? data.length}
          rowKeyExtractor={rowKeyExtractor}
          selectedRows={selectedRows}
          onSelected={onSelectedRows}
        />

        {!loading ? (
          <TBody>
            {getData(data, rowsCount, page, rowsPerPage).map(item => (
              <Tr key={rowKeyExtractor(item)}>
                {selectable && (
                  <CheckboxCell>
                    <Checkbox
                      checked={selectedRows?.some(
                        sel => rowKeyExtractor(sel) === rowKeyExtractor(item)
                      )}
                      onChange={checked => handleSelect(item, checked)}
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
        ) : (
          <TBody>
            {[...Array(rowsPerPage).keys()].map(idx => (
              <Tr key={`skeleton-${idx}`}>
                <Td colSpan={99} style={{ padding: 0 }}>
                  {skeletonComponent ?? (
                    <Skeleton height={55} radius="mili" animation="wave">
                      <div style={{ width: '100%' }} />
                    </Skeleton>
                  )}
                </Td>
              </Tr>
            ))}
          </TBody>
        )}

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
