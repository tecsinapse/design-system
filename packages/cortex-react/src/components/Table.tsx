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
  <thead className={tHead({ className })} {...rest}>
    {children}
  </thead>
);
export const TRow = ({
  children,
  className,
  ...rest
}: TableCommon & React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={tRow({ className })} {...rest}>
    {children}
  </tr>
);

export const THeadCell = ({
  children,
  className,
  ...rest
}: TableCommon & ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={tHeadCell({ className })} {...rest}>
    {children}
  </th>
);

export const TCell = ({
  children,
  className,
  ...rest
}: TableCommon & TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={tCell({ className })} {...rest}>
    {children}
  </td>
);

export const TFoot = ({
  children,
  className,
  ...rest
}: TableCommon & HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot className={tFoot({ className })} {...rest}>
    {children}
  </tfoot>
);
export const Table = ({
  children,
  className,
  ...rest
}: TableCommon & TableHTMLAttributes<HTMLTableElement>) => (
  <table className={tRoot({ className })} {...rest}>
    {children}
  </table>
);
export const Hr = ({
  children,
  className,
  ...rest
}: TableCommon & HTMLAttributes<HTMLHRElement>) => (
  <hr className={hr({ className })} {...rest}>
    {children}
  </hr>
);

export const Td = ({
  children,
  ...rest
}: TableCommon & TdHTMLAttributes<HTMLTableCellElement>) => (
  <td colSpan={99} {...rest}>
    {children}
  </td>
);
