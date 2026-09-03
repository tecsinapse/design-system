import React from 'react';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { ColorGradationType, ColorType } from '../../../styles/types';
import { colorToneBg } from '../../../styles/colors';
import { IconProps } from '../../atoms/Icon/Icon';
import { SnackbarContext } from './SnackbarContext';
import SnackbarIcon from './SnackbarIcon';
import Content from './Content';
import Action from './Action';

export interface SnackbarProps extends ViewProps {
  colorVariant?: ColorType;
  colorTone?: ColorGradationType;
  open: boolean;
  onClose?: () => void;
  dismissable?: boolean;
  timeout?: number;
  showProgressBar?: boolean;
  /** @see Snackbar.Icon — composition alternative: `<Snackbar.Root><Snackbar.Icon>…` */
  leftIcon?: IconProps;
  /** @see Snackbar.Action — composition alternative: `<Snackbar.Root><Snackbar.Action>…` */
  rightIcon?: Omit<IconProps, 'name' | 'type'>;
  anchor?: 'top' | 'bottom';
  anchorDistance?: number;
}

const FADE_DURATION = 500;

const SnackbarRoot = ({
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
      <SnackbarContext.Provider
        value={{ colorVariant, colorTone, onDismiss: handleDismiss }}
      >
        <View className="flex-row justify-between">
          {leftIcon || dismissable ? (
            <>
              {leftIcon && <SnackbarIcon {...leftIcon} />}
              <Content>{children}</Content>
              {dismissable && <Action {...rightIcon} />}
            </>
          ) : (
            children
          )}
        </View>
      </SnackbarContext.Provider>
    </Animated.View>
  );
};

SnackbarRoot.displayName = 'Snackbar';

const Snackbar = Object.assign(SnackbarRoot, {
  Root: SnackbarRoot,
  Icon: SnackbarIcon,
  Content,
  Action,
});

export default Snackbar;
