import React, { ReactNode } from 'react';
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

export const THead = ({ children }: TableCommon) => (
  <thead className={tHead()}>{children}</thead>
);
export const TRow = ({ children }: TableCommon) => (
  <tr className={tRow()}>{children}</tr>
);

export const THeadCell = ({ children }: TableCommon) => (
  <th className={tHeadCell()}>{children}</th>
);

export const TCell = ({ children }: TableCommon) => (
  <td className={tCell()}>{children}</td>
);

export const TFoot = ({ children }: TableCommon) => (
  <tfoot className={tFoot()}>{children}</tfoot>
);
export const Table = ({ children }: TableCommon) => (
  <table className={tRoot()}>{children}</table>
);
export const Hr = ({ children }: TableCommon) => (
  <hr className={hr()}>{children}</hr>
);

export const Td = ({ children }: TableCommon) => (
  <td colSpan={99}>{children}</td>
);
