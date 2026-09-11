import React, { FC } from 'react';
import { cn } from '@tecsinapse/cortex-core';
import { View } from 'react-native';
import Text, { TextProps } from '../Text/Text';
import Icon from '../Icon/Icon';
import { ColorType } from '../../../styles/types';
import { InputVariantType } from './InputContainer';

interface HintProps {
  text?: string;
  variant: InputVariantType;
  TextComponent?: FC<TextProps>;
  className?: string;
  testID?: string;
}

const Hint: FC<HintProps> = ({
  variant,
  text,
  TextComponent = Text,
  className,
  testID,
}) => {
  let color: ColorType;
  let icon;

  switch (variant) {
    case 'default':
      color = 'secondary';
      break;
    case 'error':
      color = 'error';
      icon = 'close-circle-outline';
      break;
    case 'success':
      color = 'success';
      icon = 'checkmark-circle-outline';
      break;
  }

  return (
    <View className={cn('mt-micro flex-row items-center', className)} testID={testID}>
      {icon && (
        <View className="mr-micro">
          <Icon name={icon} type="ionicon" size="centi" colorVariant={color} />
        </View>
      )}
      <TextComponent typography="label" colorVariant={color}>
        {text}
      </TextComponent>
    </View>
  );
};

export default Hint;
