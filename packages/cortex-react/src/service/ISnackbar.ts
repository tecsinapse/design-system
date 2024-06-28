import { ReactElement } from 'react';
import { SnackbarVariants } from '@tecsinapse/cortex-core';

export type TypeSnack = SnackbarVariants['intent'];

export interface ISnackbar<T> {
  show(type: TypeSnack, message: string, options?: T): any;
  custom(component: ReactElement, options?: T): any;
}
