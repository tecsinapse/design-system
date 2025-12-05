import { IoChevronDown } from 'react-icons/io5';
import { Input, InputPropsBase, Popover } from '..';
import { useEffect, useRef } from 'react';
import { usePhoneContext } from './context';

interface PhoneInputTriggerProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputPropsBase {}

export const PhoneInputTrigger = ({
  disabled = false,
  label,
  ...rest
}: PhoneInputTriggerProps) => {
  const {
    setIsOpen,
    setTriggerWidth,
    country,
    handlePhoneValueChange,
    inputValue,
  } = usePhoneContext();

  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current && setTriggerWidth) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [triggerRef.current, setTriggerWidth]);

  return (
    <Popover.Trigger disabled={disabled}>
      <Input.Face ref={triggerRef}>
        <Input.Box
          value={inputValue}
          onChange={handlePhoneValueChange}
          label={label ?? 'Insert a phone number'}
          {...rest}
        />
        <Input.Right>
          <div
            className="flex items-center gap-1 cursor-pointer w-full"
            onClick={() => setIsOpen?.(true)}
          >
            {country ? (
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.iso2.toUpperCase()}.svg`}
                className="w-[25px]"
              />
            ) : null}
            <IoChevronDown className="h-full text-md" />
          </div>
        </Input.Right>
      </Input.Face>
    </Popover.Trigger>
  );
};
