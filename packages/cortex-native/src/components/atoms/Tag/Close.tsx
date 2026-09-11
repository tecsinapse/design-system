import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Icon from '../Icon/Icon';
import { useTagContext } from './TagContext';

export type CloseProps = PressableProps;

const Close: React.FC<CloseProps> = ({ className, onPress, ...rest }) => {
  const { handleDismiss } = useTagContext();

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress ?? handleDismiss}
      className={cn('ml-[2px]', className)}
      {...rest}
    >
      <Icon name="close-outline" type="ionicon" size="centi" fontColor="medium" />
    </Pressable>
  );
};

Close.displayName = 'Tag.Close';

export default Close;
