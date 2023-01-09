/**
 * Defines a modal interface and allows you implement your own modal component.
 */
import React, { ReactNode } from 'react';

export interface IBaseModal {
  visible?: boolean;
  BoxComponent?: React.FC<any>;
  frozen?: boolean;
  isLastShown?: boolean;
  showCloseBar?: boolean;
  close?: () => void;
  onClose?: () => void;
  children?: ReactNode;
}
