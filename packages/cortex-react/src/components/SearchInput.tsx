import React, { useEffect, useState } from 'react';
import { Input, Button } from './';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebouncedState } from '../hooks';
import clsx from 'clsx';

interface SearchInputProps {
  label?: string;
  placeholder?: string;
  isSubmitting?: boolean;
  onChange?: (value: string) => void;
  onClick?: (value: string) => void;
  BOUNCE_TIMEOUT?: number;
  className?: string;
}

const inputFace = 'bg-white w-full';
const inputLeft = 'flex items-center';
const SearchInput = ({
  label,
  placeholder,
  isSubmitting = false,
  onChange,
  onClick,
  BOUNCE_TIMEOUT = 1000,
  className,
}: SearchInputProps) => {
  const [bouncedText, setBouncedText] = useState<string>('');
  const [searchInput, setSearchInput] = useDebouncedState<string>(
    '',
    setBouncedText,
    BOUNCE_TIMEOUT
  );

  useEffect(() => {
    if (onChange) {
      onChange(bouncedText);
    }
  }, [bouncedText]);

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onClick && searchInput) {
      onClick(searchInput);
    }
  };

  return (
    <div className={clsx('flex flex-row w-full space-x-mili', className)}>
      <Input.Face variants={{ className: inputFace }}>
        {!onClick && (
          <Input.Left className={inputLeft}>
            <IoSearchOutline data-testid={'icon-search-left'} />
          </Input.Left>
        )}
        <Input.Box
          placeholder={placeholder}
          label={label}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={handleEnterKey}
          disabled={isSubmitting}
        />
      </Input.Face>
      {onClick && (
        <Button
          variants={{
            intent: 'primary',
            size: 'square',
            className: 'h-11',
          }}
          onClick={() => onClick(searchInput)}
          disabled={!searchInput || isSubmitting}
        >
          {isSubmitting ? (
            <div className={'animate-spin'}>
              <AiOutlineLoading data-testid={'icon-loading'} />
            </div>
          ) : (
            <IoSearchOutline data-testid={'icon-search-button'} />
          )}
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
