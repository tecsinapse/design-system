import React from 'react';
import { Input, InputPropsBase } from './Input';
import { inputBox, labelStyle } from '@tecsinapse/cortex-core';
import TimeField from './TimeField';

export type TimeValueType = {
  hour: number;
  minute: number;
};

export interface TimeFieldInputProps extends InputPropsBase {
  value?: TimeValueType;
  onChange: (number: TimeValueType) => void;
}

export const TimeFieldInput = (props: TimeFieldInputProps) => {
  const { onChange, value, label, variants } = props;

  return (
    <>
      <Input.Face
        variants={variants}
        className={'flex flex-row'}
        data-testid={'time-field-input'}
      >
        <span className={labelStyle({})}>{label}</span>
        <div className={inputBox('', label)}>
          <TimeField onChange={onChange} value={value} />
        </div>
      </Input.Face>
    </>
  );
};
