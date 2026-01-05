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
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Option[];
}
interface Option {
  label: string;
  value: string;
}

const selectOptions = [
  { label: 'Brasil', value: 'brasil' },
  { label: 'Alemanha', value: 'alemanha' },
  { label: 'Japão', value: 'japao' },
  { label: 'Canadá', value: 'canada' },
  { label: 'Austrália', value: 'australia' },
  { label: 'França', value: 'franca' },
  { label: 'Itália', value: 'italia' },
  { label: 'México', value: 'mexico' },
  { label: 'Portugal', value: 'portugal' },
  { label: 'Argentina', value: 'argentina' },
];

export const Autocomplete = ({
  inputValue,
  setInputValue,
  label,
  onChange,
  disabled,
  options,
}: AutocompleteProps) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [selectedValue, setSelectedValue] = useState<Option>({
    label: '',
    value: '',
  });
  const [open, setOpen] = useState<boolean>(true);

  const filteredOptions = useMemo(() => {
    const optionsList = (selectOptions ?? []).filter(op =>
      op.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return optionsList;
  }, [selectOptions, inputValue]);

  const handleSelect = (option: Option) => {
    if (!(selectedValue.value === option.value)) {
      setSelectedValue(option);
    }

    setInputValue('');
    setOpen(false);
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
              {(options ?? filteredOptions ?? []).map(op => (
                <div
                  className="flex w-full h-[3rem] items-center gap-centi p-centi cursor-pointer hover:bg-secondary-xlight bg-inherit"
                  onClick={() => handleSelect(op)}
                >
                  <span className="text-base truncate">{op.label}</span>
                </div>
              ))}
            </div>
          </Popover.Content>
        </FloatingPortal>
      </div>
    </Popover.Root>
  );
};
