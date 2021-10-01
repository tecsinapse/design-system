import React from 'react';
import {
  Table,
  TableToolbar,
  TableContainer,
  Tr,
  Td,
  TBody,
} from '../../atoms/Table';
import { Header } from './Header';
import { Row } from './Row';
import { HeadersType } from './types';
import { Footer } from './Footer';
import { Skeleton } from '../../atoms/Skeleton';
import { getData, removeElement } from './utils';

export interface DataGridProps<Data>
  extends React.HTMLAttributes<HTMLDivElement> {
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
  onSelectedRows?: (data: Data[] | ((prevState: Data[]) => Data[])) => void;
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
  /** Empty state placeholder */
  emptyPlaceholder?: React.ReactNode;
}

/** Note: Consider memoizing functions for a better performance */
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
  rowsPerPageOptions: _rowsPerPageOptions,
  rowsPerPageLabel: _rowsPerPageLabel,
  exportLabel = 'Exportar',
  exportFunction,
  rowsCount,
  page = 0,
  onPageChange,
  loading = false,
  skeletonComponent,
  emptyPlaceholder,
  ...rest
}: DataGridProps<Data>): JSX.Element => {
  if (selectable && (!selectedRows || !onSelectedRows)) {
    throw new Error(
      '[DataGrid] You should specify selection handlers (selectedRows, onSelectedRows)'
    );
  }

  const rowsPerPageLabel = React.useCallback(
    value =>
      _rowsPerPageLabel
        ? _rowsPerPageLabel(value)
        : `Exibir por página: ${value} itens`,
    [_rowsPerPageLabel]
  );
  const rowsPerPageOptions = React.useMemo(
    () => _rowsPerPageOptions ?? [10, 25, 50],
    [_rowsPerPageOptions]
  );

  const handleSelect = React.useCallback(
    (current, checked) => {
      if (checked) {
        onSelectedRows?.(prevState => [...prevState, current]);
        return;
      }

      onSelectedRows?.(prevState => {
        const idx = prevState.findIndex(
          el => rowKeyExtractor(el) === rowKeyExtractor(current)
        );
        return [...removeElement(prevState, idx)];
      });
    },
    [onSelectedRows, rowKeyExtractor]
  );

  return (
    <TableContainer {...rest}>
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
            {data.length > 0 ? (
              getData(
                data,
                rowsCount,
                page,
                rowsPerPage,
                pagination
              ).map(item => (
                <Row
                  key={rowKeyExtractor(item)}
                  rowKeyExtractor={rowKeyExtractor}
                  handleSelect={handleSelect}
                  selectable={selectable}
                  headers={headers}
                  data={item}
                  checked={selectedRows?.some(
                    sel => rowKeyExtractor(sel) === rowKeyExtractor(item)
                  )}
                />
              ))
            ) : (
              <tr>
                <td colSpan={99}>{emptyPlaceholder}</td>
              </tr>
            )}
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

        {(Number(rowsCount) > 0 || data.length > 0) && (
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
        )}
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
