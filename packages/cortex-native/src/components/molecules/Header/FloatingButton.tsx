import * as React from 'react';
import { Pressable } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

import Icon, { IconProps } from '../../atoms/Icon/Icon';
import { ButtonVariants, buttonStyles } from '../../../styles/button';

export type Attachable = ButtonVariants & {
  icon: IconProps;
  valueBadge?: number;
  onPress?: () => void;
};

export const FloatingButton: React.FC<Attachable> = ({
  icon,
  onPress,
  intent = 'primary',
  variant = 'filled',
  size = 'small',
}) => (
  <Pressable
    onPress={onPress}
    className={cn(
      buttonStyles({ intent, variant, size }),
      'aspect-square h-[49px] items-center justify-center',
    )}
  >
    {icon ? <Icon {...icon} /> : null}
  </Pressable>
);

FloatingButton.displayName = 'Header.FloatingButton';

export const DummyButton: React.FC = () => (
  <Pressable disabled className="bg-transparent aspect-square h-[49px]" />
);

DummyButton.displayName = 'Header.DummyButton';
