import { IoChevronDown } from 'react-icons/io5';
import { Input, Popover } from '..';
import { usePhoneInput } from './context';
import {
  CountryCode,
  formatIncompletePhoneNumber,
  getExampleNumber,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const formatRaw = (value: string) => {
  return value.replace(/[^+\d]/g, '');
};

export const PhoneInputTrigger = ({
  onChange,
  disabled = false,
  label,
  value,
}: {
  onChange?: (value: any) => void;
  disabled?: boolean;
  label?: string;
  value?: string;
}) => {
  const { setIsOpen, setTriggerWidth, country } = usePhoneInput();
  const triggerRef = useRef<HTMLDivElement>(null);

  const formatValue = useCallback(
    (prefix: string, value?: string) => {
      if (!prefix) return '';
      const iso = country?.iso as CountryCode;
      const localValue = value ? value?.slice(prefix.length) : '';
      return formatIncompletePhoneNumber(localValue, iso);
    },
    [country]
  );
  const formatInitialValue = useCallback(
    (value?: string) => {
      const iso = country?.iso as CountryCode;
      return formatIncompletePhoneNumber(value ?? '', iso);
    },
    [country]
  );

  const prefix = useMemo(
    () => (country ? `+${country?.code} ` : ''),
    [country]
  );
  const [maskValue, setMaskValue] = useState(formatInitialValue(value) ?? '');
  const [rawValue, setRawValue] = useState(formatRaw(maskValue) ?? '');

  useEffect(() => {
    if (prefix) {
      setMaskValue(prefix);
    }
  }, [prefix]);

  const maxLength = useMemo(() => {
    if (!country) return undefined;
    const exampleNumber = getExampleNumber(
      country?.iso as CountryCode,
      examples
    );
    return exampleNumber?.number.length;
  }, [country]);

  useEffect(() => {
    if (rawValue) {
      onChange?.(rawValue);
    }
  }, [rawValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!country) {
        setMaskValue(e.target.value);
        return;
      }
      if (e.target.value.length < prefix.length) return;
      const formatted = formatValue(prefix, e.target.value);
      const nextValue = `${prefix}${formatted}`;
      const raw = formatRaw(nextValue);
      if (maxLength !== undefined && raw.length > maxLength) {
        return;
      }
      setRawValue(raw);
      setMaskValue(nextValue);
    },
    [country, prefix, maxLength, rawValue, setMaskValue]
  );

  useEffect(() => {
    if (triggerRef.current && setTriggerWidth) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [triggerRef.current, setTriggerWidth]);

  return (
    <Popover.Trigger disabled={disabled}>
      <Input.Face
        variants={{ className: 'outline-none border-1' }}
        ref={triggerRef}
      >
        <Input.Box
          value={maskValue}
          onChange={handleChange}
          label={label ?? 'Insert a phone number'}
          minLength={prefix.length} //
        />
        <Input.Left>
          <div
            className="flex items-center gap-1 cursor-pointer w-full"
            onClick={() => setIsOpen?.(true)}
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
  );
};
