import { selectVariants, option as styleOption } from '@tecsinapse/cortex-core';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Hint } from './Hint';
import SearchInput from './SearchInput';

interface CommonProps<T> {
  label: string;
  value: T | undefined;
  onSelect: (value: T) => void;
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
  onSearch?: (search: string) => void;
  disabled?: boolean;
  grouped?: boolean;
  variant?: 'error' | 'default';
  hint?: string;
  placeholderSearchInput?: string;
}

interface GroupedProps<T> {
  options?: Map<string, T[]>;
  groupedLabelExtractor: (value: string) => string;
  grouped: true;
}

interface DefaultProps<T> {
  options?: T[];
  groupedLabelExtractor?: never;
  grouped?: never;
}

type ConditionalProps<T> = GroupedProps<T> | DefaultProps<T>;

type SelectProps<T> = CommonProps<T> & ConditionalProps<T>;

const { button, dropdown, groupedTitle, containerGrouped, hintBody } =
  selectVariants();

export const Select = <T,>(props: SelectProps<T>) => {
  const {
    label,
    keyExtractor,
    labelExtractor,
    options,
    value,
    onSelect,
    onSearch,
    disabled,
    grouped,
    groupedLabelExtractor,
    hint,
    placeholderSearchInput,
    variant = 'default',
  } = props;
  const [open, setOpen] = useState(false);
  const placeholder = useMemo(
    () => (value ? labelExtractor(value) : label),
    [label, labelExtractor, value]
  );
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  const handleSelect = useCallback(
    (option: T) => {
      onSelect(option);
      setOpen(false);
    },
    [onSelect]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  const Option = ({ option }: { option: T }) => (
    <li
      onClick={() => handleSelect(option)}
      className={styleOption()}
      role={'option'}
    >
      {labelExtractor(option)}
    </li>
  );

  const GroupedOptions = ({ options }: { options?: Map<string, T[]> }) => (
    <>
      {[...(options ?? [])].map(([key, value]) => (
        <div key={key} className={containerGrouped()}>
          <span className={groupedTitle()}>{groupedLabelExtractor?.(key)}</span>
          {value.map((option: T) => (
            <Option option={option} key={keyExtractor(option)} />
          ))}
        </div>
      ))}
    </>
  );

  const DefaultOptions = ({ options }: { options?: T[] }) => (
    <>
      {(options ?? []).map(option => (
        <Option option={option} key={keyExtractor(option)} />
      ))}
    </>
  );

  return (
    <div className="w-full relative bg-white" ref={ref}>
      <button
        className={button({ disabled, intent: variant })}
        onClick={() => setOpen(prevState => !prevState)}
        disabled={disabled}
      >
        <span data-testid="select-placeholder">{placeholder}</span>
        <IoChevronDownOutline />
      </button>
      <ul
        role={'select'}
        className={dropdown({
          open,
        })}
      >
        {onSearch ? (
          <div className="m-mili">
            <SearchInput
              placeholder={placeholderSearchInput}
              onChange={onSearch}
            />
          </div>
        ) : (
          <></>
        )}
        {grouped ? (
          <GroupedOptions options={options} />
        ) : (
          <DefaultOptions options={options} />
        )}
      </ul>
      {hint && (
        <Hint
          variants={{
            intent: variant,
          }}
        >
          <div className={hintBody()}>
            {variant === 'error' ? (
              <IoIosCloseCircleOutline data-testid={'select-hint-error-icon'} />
            ) : (
              <></>
            )}
            <span>{hint}</span>
          </div>
        </Hint>
      )}
    </div>
  );
};

export default Select;
