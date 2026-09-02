import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Switch, { SwitchProps } from '../../atoms/Switch/Switch';
import Text, { TextProps } from '../../atoms/Text/Text';

export type LabelPositionOptions = 'left' | 'right';

export type LabeledSwitchProps = {
  pressableLabel?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
} & (
  | {
      leftLabel: string;
    }
  | {
      rightLabel: string;
    }
) &
  SwitchProps;

export type LabeledSwitchNativeProps = LabeledSwitchProps & {
  labelProps?: TextProps;
};

const labelMargin: Record<LabelPositionOptions, { marginLeft?: number; marginRight?: number }> = {
  left: { marginRight: 12 },
  right: { marginLeft: 12 },
};

interface LabelComponentProps extends PressableProps {
  label: string;
  labelPosition: LabelPositionOptions;
  labelProps?: TextProps;
  active: boolean;
  switchDisabled?: boolean;
}

const LabelComponent: FC<LabelComponentProps> = ({
  label,
  labelPosition,
  labelProps,
  active,
  switchDisabled = false,
  ...rest
}) => {
  const defaultFontColor = active && !switchDisabled ? 'high' : 'medium';
  const defaultFontWeight = active && !switchDisabled ? 'bold' : 'regular';

  return (
    <Pressable {...rest}>
      <Text
        style={labelMargin[labelPosition]}
        fontColor={labelProps?.fontColor ?? defaultFontColor}
        fontWeight={labelProps?.fontWeight ?? defaultFontWeight}
        {...labelProps}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const LabeledSwitch: FC<LabeledSwitchNativeProps> = ({
  rightLabel,
  leftLabel,
  labelProps,
  pressableLabel = false,
  active,
  disabled,
  onChange,
  className,
  testID,
  ...rest
}) => {
  return (
    <View className={cn('flex-row items-center', className)} testID={testID}>
      {leftLabel ? (
        <LabelComponent
          active={active}
          label={leftLabel}
          labelPosition="left"
          labelProps={labelProps}
          disabled={!pressableLabel || disabled}
          switchDisabled={disabled}
          onPress={() => onChange(!active)}
        />
      ) : (
        <></>
      )}
      <Switch active={active} onChange={onChange} disabled={disabled} {...rest} />
      {rightLabel ? (
        <LabelComponent
          active={active}
          label={rightLabel}
          labelPosition="right"
          labelProps={labelProps}
          disabled={!pressableLabel || disabled}
          switchDisabled={disabled}
          onPress={() => onChange(!active)}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default LabeledSwitch;
