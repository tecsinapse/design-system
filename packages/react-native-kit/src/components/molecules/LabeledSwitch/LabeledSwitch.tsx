import { LabeledSwitchProps, Switch } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { TextNativeProps } from '../../atoms/Text';
import LabelComponent from './LabelComponent';
import { StyledView } from './styled';

export type LabeledSwitchNativeProps = LabeledSwitchProps & {
  labelProps?: TextNativeProps;
};

const LabeledSwitch: FC<LabeledSwitchNativeProps> = ({
  label,
  labelPosition = 'right',
  labelProps,
  pressableLabel = false,
  active,
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <StyledView>
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
        onChange={onChange}
        disabled={disabled}
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
    </StyledView>
  );
};

export default LabeledSwitch;
