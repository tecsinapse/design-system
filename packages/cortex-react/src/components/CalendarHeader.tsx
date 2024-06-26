import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from './Button';

interface CalendarHeaderProps {
  onClickPrevButton: () => void;
  onClickNextButton: () => void;
  title: string;
}

export const CalendarHeader = ({
  onClickPrevButton,
  onClickNextButton,
  title,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-x-deca bg-miscellaneous-body p-mili">
      <Button
        onClick={onClickPrevButton}
        variants={{ variant: 'text', intent: 'secondary', size: 'small' }}
      >
        <FaChevronLeft />
      </Button>
      <span className="font-bold capitalize">{title}</span>
      <Button
        onClick={onClickNextButton}
        variants={{ variant: 'text', intent: 'secondary', size: 'small' }}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};
