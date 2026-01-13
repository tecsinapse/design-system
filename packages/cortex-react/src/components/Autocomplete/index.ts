import { AutocompleteRoot } from './Root';
import { AutocompleteTrigger } from './Trigger';
import { AutocompletePopover } from './Popover';
import { AutocompleteOptions } from './Options';
import { AutocompleteOption } from './Option';
import { AutocompleteGroupedOptions } from './GroupedOptions';

export const Autocomplete = {
  Root: AutocompleteRoot,
  Trigger: AutocompleteTrigger,
  Popover: AutocompletePopover,
  Options: AutocompleteOptions,
  Option: AutocompleteOption,
  GroupedOptions: AutocompleteGroupedOptions,
};

export * from './types';
