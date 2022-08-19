import {
  FontColor,
  FontWeight,
  LabelPositionOptions,
  PressableSurface,
  PressableSurfaceProps,
  TextProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyledLabel } from './styled';

export interface LabelComponentProps extends PressableSurfaceProps {
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
    <PressableSurface effect={'none'} {...rest}>
      <StyledLabel
        labelPosition={labelPosition}
        fontColor={labelProps?.fontColor ?? defaultFontColor}
        fontWeight={labelProps?.fontWeight ?? defaultFontWeight}
        {...labelProps}
      >
        {label}
      </StyledLabel>
    </PressableSurface>
  );
};

export default React.memo(LabelComponent);
