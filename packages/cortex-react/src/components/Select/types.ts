import { ReactNode } from 'react';

export interface ContentProps {
  /** child element */
  children: ReactNode;
}

export interface SelectGroupedOptionsProps<T> {
  onSelect: (value: T) => void;
  options?: Map<string, T[]> | (() => Promise<Map<string, T[]>>);
  groupedLabelExtractor: (value: string) => string;
}

export interface SelectMultiCheckAllOptionsProps {
  checkAllLabel?: string;
}

export interface SelectMultiGroupedOptionsProps<T> {
  onSelect: (value: T[]) => void;
  options?: Map<string, T[]> | (() => Promise<Map<string, T[]>>);
  groupedLabelExtractor: (value: string) => string;
  /** child element */
  children?: React.ReactNode;
}

export interface SelectMultiOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
  grouped?: boolean;
}

export interface SelectMultiOptionsProps<T> {
  options?: T[] | (() => Promise<T[]>);
  onSelect: (value: T[]) => void;
  /** child element */
  children?: React.ReactNode;
}

export interface SelectOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
  grouped?: boolean;
}

export interface SelectOptionsProps<T> {
  options?: T[] | (() => Promise<T[]>);
  onSelect: (value: T) => void;
}

export interface SelectPopoverProps {
  /** child element */
  children: ReactNode;
}
export interface SelectRootProps<T> {
  /** child element */
  children: ReactNode;
  value?: T | T[];
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export interface SelectTriggerProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
}
