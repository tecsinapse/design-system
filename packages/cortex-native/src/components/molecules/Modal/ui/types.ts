import React, { ReactNode } from 'react';

export interface IBaseModal {
  visible?: boolean;
  BoxComponent?: React.FC<any>;
  frozen?: boolean;
  isLastShown?: boolean;
  isRaiseKeyboard?: boolean;
  showCloseBar?: boolean;
  close?: () => void;
  onClose?: () => void;
  children?: ReactNode;
}
