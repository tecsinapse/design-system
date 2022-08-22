import {
  ButtonSizeType,
  FontColor,
  IconPositionOptions,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';

interface TextComponentProps {
  textProps?: TextProps;
  size?: ButtonSizeType;
  defaultFontColor: keyof FontColor;
  label?: string;
  iconPosition?: IconPositionOptions;
  hasIcon?: boolean;
}

const TextComponent: FC<TextComponentProps> = ({
  textProps,
  size = 'default',
  defaultFontColor,
  label,
}) => {
  return label ? (
    <Text
      typography={textProps?.typography ?? size === 'small' ? 'sub' : 'base'}
      fontWeight={textProps?.fontWeight ?? 'bold'}
      fontColor={textProps?.fontColor ?? defaultFontColor}
      {...textProps}
    >
      {label}
    </Text>
  ) : (
    <></>
  );
};

export default React.memo(TextComponent);
