import { useCallback } from 'react';
import { DateRange } from '../components';
import { usePopoverContext } from '../components/Popover/Context';

interface useDatePickerInputCommonProps {
  onChangeCalendar?: (value?: Date) => void;
  onChangeRangeCalendar?: (value?: DateRange) => void;
}

export const useDatePickerInputCommon = ({
  onChangeCalendar,
  onChangeRangeCalendar,
}: useDatePickerInputCommonProps) => {
  const { setIsOpen } = usePopoverContext();

  const handleTogglePopover = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  const handleChangeCalendar = useCallback((value?: Date | DateRange) => {
    setIsOpen(false);
    onChangeCalendar?.(value as Date);
    onChangeRangeCalendar?.(value as DateRange);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    handleTogglePopover,
    handleChangeCalendar,
    handleCloseCalendar,
  };
};
