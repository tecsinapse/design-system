import { LabeledSwitchProps, TextProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import LabelComponent from './LabelComponent';
import { StyledDiv } from './styled';
import Switch from '../../atoms/Switch/Switch';

export type LabeledSwitchWebProps = LabeledSwitchProps & {
  labelProps?: TextProps;
};

const LabeledSwitch: FC<LabeledSwitchWebProps> = ({
  label,
  labelPosition = 'right',
  labelProps,
  pressableLabel = false,
  disabled,
  active,
  onChange,
  ...rest
}) => {
  return (
    <StyledDiv>
      {labelPosition === 'left' ? (
        <LabelComponent
          active={active}
          label={label}
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
      {labelPosition === 'right' ? (
        <LabelComponent
          active={active}
          label={label}
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
