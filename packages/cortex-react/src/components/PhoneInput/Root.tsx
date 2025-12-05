import { ReactNode, useState } from 'react';
import { Popover } from '../Popover';
import clsx from 'clsx';
import {
  usePhoneInput,
  defaultCountries,
  ParsedCountry,
  CountryIso2,
} from 'react-international-phone';
import { PhoneInputContext } from './context';

export const PhoneInputRoot = ({
  children,
  className,
  defaultCountry,
  value,
  onChange,
}: {
  children: ReactNode;
  value?: string;
  onChange?: (
    value: string,
    rest: { inputValue: string; country: ParsedCountry }
  ) => void;
  className?: string;
  defaultCountry?: CountryIso2;
}) => {
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
    defaultCountry,
    value,
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
