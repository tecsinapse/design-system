import { useDatePickerInput, useDatePickerInputCommon } from '../../hooks';
import { dateToCalendarDateTime } from '../../utils';
import { Calendar } from '../Calendar/Calendar';
import { Content } from '../Content';
import { InputProps } from '../Input';
import { Popover } from '../Popover';
import { DateField } from './DateField';
import { DatePickerInputBase } from './DatePickerInputBase';
import { BaseDatePickerInputProps } from './types';

export interface DatePickerInputProps
  extends Omit<InputProps, 'value' | 'onChange'>,
    BaseDatePickerInputProps {
  value?: Date;
  onChange: (date?: Date) => void;
}

const DatePickerInputWithPopover = (props: DatePickerInputProps) => {
  const {
    onChange,
    value,
    label,
    variants,
    disabled,
    hourCycle = 24,
    granularity = 'day',
    isTodayHighlited,
    minValue,
    maxValue,
  } = props;
  const { fieldProps, state, ref } = useDatePickerInput({
    value,
    onChange,
    minValue,
    maxValue,
  });
  const { handleTogglePopover, handleChangeCalendar, handleCloseCalendar } =
    useDatePickerInputCommon({
      onChangeCalendar: (_value?: Date) => {
        state.setValue(dateToCalendarDateTime(_value));
      },
    });

  return (
    <div ref={ref} data-testid="date-picker-input">
      <Popover.Trigger disabled={true}>
        <DatePickerInputBase
          variants={{
            ...variants,
            intent: state.isInvalid ? 'error' : variants?.intent,
          }}
          label={label}
          disabled={disabled}
          value={value}
          onClean={() => state.setValue(null)}
          onToggle={handleTogglePopover}
        >
          <DateField
            {...fieldProps}
            onChange={value => {
              fieldProps.onChange?.(value);
              handleCloseCalendar();
            }}
            isDisabled={disabled}
            onClickDate={handleTogglePopover}
            hourCycle={hourCycle}
            granularity={granularity}
          />
        </DatePickerInputBase>
      </Popover.Trigger>
      <Popover.Content
        className="bg-inherit shadow-default border-none"
        initialFocus={-1}
      >
        <Calendar
          value={value}
          onChange={handleChangeCalendar}
          isTodayHighlited={isTodayHighlited}
          minValue={minValue}
          maxValue={maxValue}
        />
      </Popover.Content>
    </div>
  );
};

/** DatePickerInput component, extends HTML Input Element props*/
export const DatePickerInput = (props: DatePickerInputProps) => (
  <Popover.Root placement="bottom-start" trigger="click">
    <Content>
      <DatePickerInputWithPopover {...props} />
    </Content>
  </Popover.Root>
);
