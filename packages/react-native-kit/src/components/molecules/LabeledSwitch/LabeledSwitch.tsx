import { LabeledSwitchProps, Switch } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { TextNativeProps } from '../../atoms/Text';
import LabelComponent from './LabelComponent';
import { StyledView } from './styled';

export type LabeledSwitchNativeProps = LabeledSwitchProps & {
  labelProps?: TextNativeProps;
};

const LabeledSwitch: FC<LabeledSwitchNativeProps> = ({
  rightLabel,
  leftLabel,
  labelProps,
  pressableLabel = false,
  active,
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <StyledView>
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
        onChange={onChange}
        disabled={disabled}
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
    </StyledView>
  );
};

export default LabeledSwitch;
