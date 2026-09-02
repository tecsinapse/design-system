import React, { ReactNode } from 'react';
import { Animated, Pressable, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { ColorGradationType, ColorType } from '../../../styles/types';
import { colorToneBg } from '../../../styles/colors';
import Icon, { IconProps } from '../../atoms/Icon/Icon';

export interface SnackbarProps extends ViewProps {
  colorVariant?: ColorType;
  colorTone?: ColorGradationType;
  open: boolean;
  onClose?: () => void;
  dismissable?: boolean;
  timeout?: number;
  showProgressBar?: boolean;
  leftIcon?: IconProps;
  rightIcon?: Omit<IconProps, 'name' | 'type'>;
  anchor?: 'top' | 'bottom';
  anchorDistance?: number;
}

const FADE_DURATION = 500;

const Snackbar = ({
  children,
  open = true,
  onClose,
  dismissable = false,
  timeout = undefined,
  leftIcon,
  colorTone = 'xlight',
  colorVariant = 'primary',
  rightIcon = { colorTone: 'medium', colorVariant: 'primary' },
  anchor = 'bottom',
  anchorDistance,
  style,
  className,
  testID,
  ...rest
}: SnackbarProps): React.ReactElement => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: FADE_DURATION,
    }).start(() => timeout && fadeOut());
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: FADE_DURATION,
      delay: timeout ? timeout - FADE_DURATION : 0,
    }).start();
  };

  const handleClose = () => {
    clearTimeout(timeoutRef.current);
    fadeAnim.setValue(0);
    onClose?.();
  };

  const handleDismiss = () => {
    fadeOut();
    setTimeout(() => {
      handleClose();
    }, FADE_DURATION);
  };

  React.useEffect(() => {
    if (open) {
      fadeIn();
    }
    if (open && timeout) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, timeout + FADE_DURATION);
    }
  }, [open, timeout]);

  if (!open) {
    return <></>;
  }

  const anchorStyle: ViewStyle =
    anchor === 'top'
      ? { top: anchorDistance ?? 16 }
      : { bottom: anchorDistance ?? 16 };

  return (
    <Animated.View
      {...rest}
      testID={testID}
      className={cn(
        colorToneBg[colorVariant][colorTone],
        'rounded-mili shadow-default p-mili flex',
        className
      )}
      style={[
        {
          position: 'absolute',
          left: 16,
          right: 16,
          zIndex: 1000,
          opacity: fadeAnim,
        },
        anchorStyle,
        style,
      ]}
    >
      <View className="flex-row justify-between">
        <View className="flex-row items-center flex-shrink">
          {leftIcon && (
            <View className="mr-mili">
              <Icon {...leftIcon} size="centi" />
            </View>
          )}
          <View className="flex-shrink">{children}</View>
        </View>
        {dismissable && (
          <Pressable
            accessibilityRole="button"
            onPress={handleDismiss}
            className="ml-mili"
          >
            <Icon
              {...rightIcon}
              size="centi"
              name="close"
              type="material-community"
            />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default Snackbar;
