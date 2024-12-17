import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '../Button';

export interface CalendarHeaderProps {
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
    <div
      className="flex flex-row justify-between items-center gap-x-deca bg-miscellaneous-body p-mili"
      data-testid="calendar-header"
    >
      <Button
        onClick={onClickPrevButton}
        variants={{ variant: 'text', intent: 'secondary', size: 'small' }}
        data-testid="calendar-header-prev-button"
        type="button"
      >
        <FaChevronLeft />
      </Button>
      <span className="font-bold capitalize">{title}</span>
      <Button
        onClick={onClickNextButton}
        variants={{ variant: 'text', intent: 'secondary', size: 'small' }}
        data-testid="calendar-header-next-button"
        type="button"
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};
