import React from 'react';
import { Input, InputPropsBase } from './Input';
import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import TimeField from './TimeField';

export type TimeValueT = {
  /** The hour, numbered from 0 to 23. */
  readonly hour: number;
  /** The minute in the hour. */
  readonly minute: number;
  /** The second in the minute. */
};

export interface TimeFieldInputProps extends InputPropsBase {
  value?: TimeValueT;
  onChange: (number: TimeValueT) => void;
}

export const TimeFieldInput = (props: TimeFieldInputProps) => {
  const { onChange, value, label } = props;

  return (
    <>
      <Input.Face
        placeholder={'teste'}
        variants={{ className: 'flex flex-row', intent: 'error' }}
        className={'flex flex-row'}
      >
        <span className={labelStyle({})}>{label}</span>
        <div className={inputBox('', label)}>
          <TimeField onChange={onChange} value={value} />
        </div>
      </Input.Face>
      <Input.Root />
    </>
  );
};
