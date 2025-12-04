import { ReactNode, useState } from 'react';
import { Popover } from '../Popover';
import clsx from 'clsx';
import { Country, PhoneInputContext } from './context';
import { countries } from './countryCodes';

export const PhoneInputRoot = ({
  children,
  className,
  defaultDDI,
}: {
  children: ReactNode;
  className?: string;
  defaultDDI?: string;
}) => {
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<Country | null>(
    countries.find(c => c.code === defaultDDI) ?? null
  );

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
        }}
      >
        <div className={clsx('relative w-full h-full', className)}>
          {children}
        </div>
      </PhoneInputContext.Provider>
    </Popover.Root>
  );
};
