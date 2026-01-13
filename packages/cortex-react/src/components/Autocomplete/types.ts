import React, { ChangeEventHandler, ReactNode } from 'react';

export interface Option {
  label: string;
  value: string;
}

export interface AutocompleteRootProps {
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

export interface AutocompleteOptionsProps {
  options?: Option[];
  onSelect?: (option: Option) => void;
  children?: ReactNode;
}

export interface AutocompleteGroupedOptionsProps {
  options?: Map<string, Option[]>; //adicionar promise
  groupedLabelExtractor: (value: string) => string;
  onSelect?: (option: Option) => void;
}

export interface AutocompleteOptionProps {
  option: Option;
  onSelect?: (option: Option) => void;
  grouped?: boolean;
}

export interface AutocompleteProps<T> {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  options: Option[];
  onSelect?: (option: Option) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
