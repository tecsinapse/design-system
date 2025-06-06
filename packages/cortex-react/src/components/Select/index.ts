import { SelectGroupedOptions } from './GroupedOptions';
import { SelectMultiCheckAllOptions } from './MultiCheckAllOptions';
import { SelectMultiGroupedOptions } from './MultiGroupedOptions';
import { SelectMultiOption } from './MultiOption';
import { SelectMultiOptions } from './MultiOptions';
import { SelectOption } from './Option';
import { SelectOptions } from './Options';
import { SelectPopover } from './Popover';
import { SelectRoot } from './Root';
import { SelectTrigger } from './Trigger';
import { SelectCustomOption } from './CustomOption';
import { SelectCustomMultiOption } from './CustomMultiOption';

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Popover: SelectPopover,
  Options: SelectOptions,
  GroupedOptions: SelectGroupedOptions,
  Option: SelectOption,
  MultiOptions: SelectMultiOptions,
  MultiGroupedOptions: SelectMultiGroupedOptions,
  MultiOption: SelectMultiOption,
  MultiCheckAllOptions: SelectMultiCheckAllOptions,
  CustomOption: SelectCustomOption,
  CustomMultiOption: SelectCustomMultiOption,
};

export * from './types';
