import { LabeledSwitchProps, TextProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import LabelComponent from './LabelComponent';
import { StyledDiv } from './styled';
import Switch from '../../atoms/Switch/Switch';

export type LabeledSwitchWebProps = LabeledSwitchProps & {
  labelProps?: TextProps;
};

const LabeledSwitch: FC<LabeledSwitchWebProps> = ({
  labelProps,
  pressableLabel = false,
  disabled,
  active,
  onChange,
  leftLabel,
  rightLabel,
  ...rest
}) => {
  return (
    <StyledDiv>
      {leftLabel ? (
        <LabelComponent
          active={active}
          label={leftLabel}
          labelPosition={'left'}
          labelProps={labelProps}
          disabled={!pressableLabel || disabled}
          switchDisabled={disabled}
          onPress={() => onChange(!active)}
        />
      ) : (
        <></>
      )}
      <Switch
        active={active}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      {rightLabel ? (
        <LabelComponent
          active={active}
          label={rightLabel}
          labelPosition={'right'}
          labelProps={labelProps}
          disabled={!pressableLabel || disabled}
          switchDisabled={disabled}
          onPress={() => onChange(!active)}
        />
      ) : (
        <></>
      )}
    </StyledDiv>
  );
};

export default LabeledSwitch;
