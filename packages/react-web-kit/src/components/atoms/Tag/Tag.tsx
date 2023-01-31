import React, { ReactNode } from 'react';
import {
  Text,
  Tag as TagCore,
  TagProps as TagCoreProps,
  TextProps,
} from '@tecsinapse/react-core';

export interface TagProps extends Omit<TagCoreProps, 'value'> {
  value: string | ReactNode;
  textProps?: TextProps;
}

const Tag: React.FC<TagProps> = ({
  value,
  textProps,
  backgroundColorVariant,
  backgroundColorTone,
  ...rest
}): JSX.Element => {
  const {
    colorVariant = 'secondary',
    colorTone = 'dark',
    fontStack = 'default',
    fontWeight = 'bold',
  } = textProps || {};
  return (
    <TagCore
      backgroundColorVariant={backgroundColorVariant}
      backgroundColorTone={backgroundColorTone}
      value={
        <Text
          colorVariant={colorVariant}
          colorTone={colorTone}
          fontStack={fontStack}
          fontWeight={fontWeight}
          typography={rest.variant === 'small' ? 'sub' : 'base'}
        >
          {value}
        </Text>
      }
      {...rest}
    />
  );
};

export default Tag;
