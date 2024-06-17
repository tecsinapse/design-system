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

export const TRowHeader = ({
  children,
}: TableCommon & ThHTMLAttributes<HTMLTableCellElement>) => (
  <>
    <tr className={tRow()}>{children}</tr>
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

//TODO: Verificar se realmente é preciso remover, pois funciona na tabela do stories e eram assim no web-kit
export const Td = ({
  children,
  ...rest
}: TableCommon & TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...rest}>{children}</td>
);
