import React, { useContext, useEffect, useRef } from 'react';
import { Popover } from '../Popover';
import { Input } from '../Input';
import { AutocompleteContext } from './context';
import { AutocompleteTriggerProps } from './types';

export const AutocompleteTrigger = ({
  inputValue,
  onChange,
  label,
  disabled,
  placeholder,
}: AutocompleteTriggerProps) => {
  const context = useContext(AutocompleteContext);
  if (!context)
    throw new Error('AutocompleteTrigger must be used within AutocompleteRoot');

  const { setTriggerWidth, setOpen } = context;
  const triggerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (triggerRef.current && setTriggerWidth) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [triggerRef.current, setTriggerWidth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (event.target.value.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Popover.Trigger>
      <Input.Root
        label={label ?? 'Selecione uma opção'}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        ref={triggerRef}
      />
    </Popover.Trigger>
  );
};
