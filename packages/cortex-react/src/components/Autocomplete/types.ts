import React, { ChangeEventHandler, ReactNode } from 'react';

export interface Option {
  label: string;
  value: string;
}

export interface AutocompleteRootProps<T> {
  keyExtractor: (option: T) => string;
  labelExtractor: (option: T) => string;
  children: ReactNode;
  className?: string;
}

export interface AutocompleteTriggerProps {
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface AutocompletePopoverProps {
  children: ReactNode;
  className?: string;
}

export interface AutocompleteOptionsProps<T> {
  keyExtractor?: (option: T) => string;
  options?: T[] | (() => Promise<T[]>);
  onSelect?: (option: T) => void;
  children?: ReactNode;
}

export interface AutocompleteGroupedOptionsProps<T> {
  options?: Map<string, T[]> | (() => Promise<Map<string, T[]>>);
  groupedLabelExtractor: (value: string) => string;
  onSelect?: (option: T) => void;
}

export interface AutocompleteOptionProps<T> {
  keyExtractor?: (option: T) => string;
  option: T;
  onSelect?: (option: T) => void;
  grouped?: boolean;
}

export interface AutocompleteProps<T> {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  options: T[] | (() => Promise<T[]>);
  onSelect?: (option: T) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
