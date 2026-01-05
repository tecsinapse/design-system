import React, {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Popover } from '../Popover';
import { Input } from '../Input';
import { FloatingPortal } from '@floating-ui/react';

interface AutocompleteProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  options: Option[];
  onSelect?: (option: Option) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
interface Option {
  label: string;
  value: string;
}

export const Autocomplete = ({
  inputValue,
  label,
  onChange,
  onSelect,
  disabled,
  options,
}: AutocompleteProps) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [open, setOpen] = useState<boolean>(true);

  const filteredOptions = useMemo(() => {
    const optionsList = (options ?? []).filter(op =>
      op.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return optionsList;
  }, [options, inputValue]);

  const handleSelect = (option: Option) => {
    setOpen(false);
    onSelect?.(option);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (event.target.value.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const triggerRef = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    if (triggerRef.current && setTriggerWidth) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [triggerRef.current, setTriggerWidth]);

  return (
    <Popover.Root
      placement="bottom-start"
      controlled
      isOpen={open}
      setIsOpen={setOpen}
    >
      <div className="relative w-full h-full">
        <Popover.Trigger>
          <Input.Root
            label={label ?? 'Selecione uma opção'}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            ref={triggerRef as React.RefObject<HTMLInputElement>}
          />
        </Popover.Trigger>
        <FloatingPortal>
          <Popover.Content
            className="w-full bg-white shadow-md rounded-md overflow-hidden max-h-[30vh] outline-none z-9999"
            style={{
              width: triggerWidth ? `${triggerWidth}px` : 'auto',
            }}
            initialFocus={-1}
          >
            <div className="w-full flex flex-col overflow-y-auto">
              {(options ?? filteredOptions ?? []).map(option => (
                <div
                  className="flex w-full h-[3rem] items-center gap-centi p-centi cursor-pointer hover:bg-secondary-xlight bg-inherit"
                  onClick={() => handleSelect(option)}
                >
                  <span className="text-base truncate">{option.label}</span>
                </div>
              ))}
            </div>
          </Popover.Content>
        </FloatingPortal>
      </div>
    </Popover.Root>
  );
};
