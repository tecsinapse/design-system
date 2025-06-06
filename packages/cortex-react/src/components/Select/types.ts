import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ContentProps {
  /** child element */
  children: ReactNode;
  className?: string;
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
  onSelect?: (option: T[]) => void;
  grouped?: boolean;
}

export interface CustomMultiOptionProps<T> extends SelectMultiOptionProps<T> {
  children?: ReactNode;
}

export interface SelectMultiOptionsProps<T> {
  options?: T[] | (() => Promise<T[]>);
  onSelect?: (value: T[]) => void;
  /** child element */
  children?: React.ReactNode;
}

export interface SelectOptionProps<T> {
  option: T;
  onSelectOption: (option: T) => void;
  grouped?: boolean;
}

export interface CustomOptionProps<T> extends SelectOptionProps<T> {
  children?: ReactNode;
}
export interface SelectOptionsProps<T> {
  options?: T[] | (() => Promise<T[]>);
  onSelect?: (value: T) => void;
  children?: ReactNode;
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
  className?: string;
}

export interface SelectTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  /** If no function is passed, it will render'`${n} items selected' */
  multiLabelSelected?: (n: number) => string;
}
