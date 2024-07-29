import { ReactNode } from 'react';

export interface ContentProps {
  children: ReactNode;
}

export interface SelectGroupedOptionsProps<T> {
  onSelect: (value: T) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
}

export interface SelectMultiCheckAllOptionsProps {
  checkAllLabel?: string;
}

export interface SelectMultiGroupedOptionsProps<T> {
  onSelect: (value: T[]) => void;
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
  children?: React.ReactNode;
}

export interface SelectMultiOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
  grouped?: boolean;
}

export interface SelectMultiOptionsProps<T> {
  options?: T[];
  onSelect: (value: T[]) => void;
  children?: React.ReactNode;
}

export interface SelectOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
  grouped?: boolean;
}

export interface SelectOptionsProps<T> {
  options?: T[];
  onSelect: (value: T) => void;
}

export interface SelectPopoverProps {
  children: ReactNode;
}
export interface SelectRootProps<T> {
  children: ReactNode;
  value?: T | T[];
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export interface SelectTriggerProps {
  label: string;
  disabled?: boolean;
}
