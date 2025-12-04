import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../Input';
import { countries } from './countryCodes';
import examples from 'libphonenumber-js/mobile/examples';
import {
  formatIncompletePhoneNumber,
  CountryCode,
  isSupportedCountry,
  getExampleNumber,
} from 'libphonenumber-js';
import { Popover } from '../Popover';
import { IoChevronDown } from 'react-icons/io5';
import { Divider } from '../Divider';
import { FloatingPortal } from '@floating-ui/react';

interface Country {
  country: string;
  iso: string;
  code: string;
}

const CountrySelectOption = ({
  country,
  setCountry,
  setIsOpen,
  disableClick = false,
}: {
  country: Country | null;
  setCountry: React.Dispatch<React.SetStateAction<Country | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disableClick?: boolean;
}) => {
  return (
    <div
      className="flex w-full h-[2rem] items-center justify-between p-centi cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (!disableClick) {
          setCountry(country);
          setIsOpen(false);
        }
      }}
    >
      <span>{country?.country}</span>
      <span className="text-gray-400 text-sm">+{country?.code}</span>
    </div>
  );
};

export const PhoneInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [country, setCountry] = useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return countries.filter(
      c => c.iso !== country?.iso && isSupportedCountry(c.iso)
    );
  }, [country]);

  useEffect(() => {
    setFilteredCountries(filtered);
  }, [filtered]);

  const exampleNumber = getExampleNumber(country?.iso as CountryCode, examples);
  const maxLength = exampleNumber?.number.length;

  useEffect(() => {
    if (country) {
      setValue(`+${country.code} `);
    }
  }, [country]);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = `+${country?.code} `;
    if (value.length < prefix.length) return;
    const iso = country?.iso as CountryCode;
    const localValue = value.slice(prefix.length);
    const formatted = formatIncompletePhoneNumber(localValue, iso);
    const nextValue = `${prefix}${formatted}`;
    const raw = nextValue.replace(/[^+\d]/g, '');
    if (raw.length > maxLength) {
      return;
    }
    setValue(nextValue);
  };

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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="relative w-full h-full">
        <Popover.Trigger>
          <Input.Face
            variants={{ className: 'outline-none border-1' }}
            ref={triggerRef}
          >
            <Input.Box
              value={value}
              onChange={handleChange}
              placeholder={
                country
                  ? formatIncompletePhoneNumber(
                      String(
                        getExampleNumber(country.iso as CountryCode, examples)
                          ?.nationalNumber
                      ),
                      country.iso as CountryCode
                    )
                  : 'Insira o telefone'
              }
              minLength={`+${country?.code} `.length}
            />
            <Input.Left>
              <div
                className="flex items-center gap-1 cursor-pointer w-full"
                onClick={() => setIsOpen(true)}
              >
                {country ? (
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.iso}.svg`}
                    className="w-[25px]"
                  />
                ) : null}
                <IoChevronDown className="h-full text-md" />
              </div>
            </Input.Left>
          </Input.Face>
        </Popover.Trigger>

        <FloatingPortal>
          <Popover.Content
            className="bg-white shadow-md rounded-md overflow-hidden h-full max-h-[30vh] outline-none"
            style={{
              zIndex: 9999,
              width: triggerWidth ? `${triggerWidth}px` : 'auto',
            }}
          >
            <div className="w-full h-full flex flex-col overflow-y-auto">
              {country ? (
                <>
                  <CountrySelectOption
                    country={country}
                    setCountry={setCountry}
                    setIsOpen={setIsOpen}
                    disableClick
                  />
                  <Divider />
                </>
              ) : null}
              {filteredCountries.map(country => (
                <CountrySelectOption
                  country={country}
                  setCountry={setCountry}
                  setIsOpen={setIsOpen}
                  key={`${country.code} ${country.iso}`}
                />
              ))}
            </div>
          </Popover.Content>
        </FloatingPortal>
      </div>
    </Popover.Root>
  );
};
