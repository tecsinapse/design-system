import { SnackbarVariants } from '@tecsinapse/cortex-core';
import { ReactElement } from 'react';

export type TypeSnack = SnackbarVariants['intent'];

export interface ISnackbar<T> {
  _options?: T;
  show(type: TypeSnack, message: string, options?: T): any;
  custom(component: ReactElement, options?: T): any;
}
