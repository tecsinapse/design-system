import {
  FontColor,
  FontWeight,
  LabelPositionOptions,
  TextProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { StyledLabel } from './styled';

export interface LabelComponentProps extends PressableProps {
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
  const defaultFontColor: keyof FontColor =
    active && !switchDisabled ? 'dark' : 'medium';
  const defaultFontWeight: keyof FontWeight =
    active && !switchDisabled ? 'bold' : 'regular';

  return (
    <Pressable {...rest}>
      <StyledLabel
        labelPosition={labelPosition}
        fontColor={labelProps?.fontColor ?? defaultFontColor}
        fontWeight={labelProps?.fontWeight ?? defaultFontWeight}
        {...labelProps}
      >
        {label}
      </StyledLabel>
    </Pressable>
  );
};

export default React.memo(LabelComponent);
