import { ReactNode, useState } from 'react';
import { Popover } from '../Popover';
import clsx from 'clsx';
import {
  usePhoneInput,
  defaultCountries,
  ParsedCountry,
  UsePhoneInputConfig,
} from 'react-international-phone';
import { PhoneInputContext } from './context';

interface PhoneInputRootProps extends Omit<UsePhoneInputConfig, 'onChange'> {
  children: ReactNode;
  className?: string;
  onChange?: (
    value: string,
    rest: { inputValue: string; country: ParsedCountry }
  ) => void;
}

export const PhoneInputRoot = ({
  children,
  className,
  onChange,
  ...rest
}: PhoneInputRootProps) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    country,
    handlePhoneValueChange,
    inputRef,
    inputValue,
    phone,
    setCountry,
  } = usePhoneInput({
    countries: defaultCountries,
    onChange: ({ phone, ...rest }) => {
      onChange?.(phone, { ...rest });
    },
    ...rest,
  });

  return (
    <Popover.Root
      placement="bottom-start"
      controlled
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <PhoneInputContext.Provider
        value={{
          triggerWidth,
          setTriggerWidth,
          isOpen,
          setIsOpen,
          country,
          setCountry,
          handlePhoneValueChange,
          inputValue,
          phone,
          inputRef,
        }}
      >
        <div className={clsx('relative w-full h-full', className)}>
          {children}
        </div>
      </PhoneInputContext.Provider>
    </Popover.Root>
  );
};
