import React, {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import {
  hr,
  tCell,
  tFoot,
  tHead,
  tHeadCell,
  tRoot,
  tRow,
} from '@tecsinapse/cortex-core';

interface TableCommon {
  children?: ReactNode;
}

export const THead = ({
  children,
  className,
  ...rest
}: TableCommon & HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={tHead({ className })} data-testid="thead" {...rest}>
    {children}
  </thead>
);
export const TRow = ({
  children,
  className,
  ...rest
}: TableCommon & React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={tRow({ className })} data-testid="trow" {...rest}>
    {children}
  </tr>
);

export const THeadCell = ({
  children,
  className,
  ...rest
}: TableCommon & ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={tHeadCell({ className })} data-testid="thead-cell" {...rest}>
    {children}
  </th>
);

export const TRowHeader = ({
  children,
}: TableCommon & ThHTMLAttributes<HTMLTableCellElement>) => (
  <>
    <tr className={tRow()} data-testid={'trow-header'}>
      {children}
    </tr>
    <tr className={tRow()}>
      <td colSpan={99}>
        <hr className={hr()} />
      </td>
    </tr>
  </>
);

export const TCell = ({
  children,
  className,
  ...rest
}: TableCommon & TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={tCell({ className })} data-testid={'tcell'} {...rest}>
    {children}
  </td>
);

export const TFoot = ({
  children,
  className,
  ...rest
}: TableCommon & HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot className={tFoot({ className })} data-testid={'tfoot'} {...rest}>
    {children}
  </tfoot>
);
export const Table = ({
  children,
  className,
  ...rest
}: TableCommon & TableHTMLAttributes<HTMLTableElement>) => (
  <table className={tRoot({ className })} data-testid={'table'} {...rest}>
    {children}
  </table>
);

export const Td = ({
  children,
  ...rest
}: TableCommon & TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...rest} data-testid={'td'}>
    {children}
  </td>
);
