import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { Icon, IconProps } from '../../atoms/Icon';
import {
  ContentContainer,
  DismissContainer,
  IconContainer,
  SnackbarContainer,
} from './styled';
import { ProgressBar } from '@tecsinapse/react-core';

export interface SnackbarProps {
  colorVariant?: ColorType;
  colorTone?: ColorGradationType;
  open: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Snackbar is closable */
  dismissable?: boolean;
  /** Time in miliseconds for auto hide */
  timeout?: number;
  leftIcon?: IconProps;
  /** Properties for close icon */
  rightIcon?: Omit<IconProps, 'name' | 'type'>;
  anchor?: 'top' | 'bottom';
  /** Distance from anchorage (results in px) */
  anchorDistance?: number;
  style?: StyleProp<ViewStyle>;
}

export const Snackbar: React.FC<SnackbarProps> = ({
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
  ...rest
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const duration = 500;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration,
      delay: timeout ? timeout : 0,
    }).start();
  };
  React.useEffect(() => {
    fadeIn();
    if (open && timeout) {
      // fadeOut(); verificar
      setTimeout(() => {
        onClose?.();
      }, timeout + duration);
    }
  }, [open, timeout]);

  return (
    <SnackbarContainer
      {...rest}
      colorVariant={colorVariant}
      colorTone={colorTone}
      elevated
      anchor={anchor}
      anchorDistance={anchorDistance}
      visible={open}
      style={{ opacity: (fadeAnim as unknown) as number }}
      timeout={timeout}
    >
      <ContentContainer>
        {leftIcon && (
          <IconContainer>
            <Icon {...leftIcon} size="centi" />
          </IconContainer>
        )}
        {children}
      </ContentContainer>
      {dismissable && (
        <DismissContainer
          effect="none"
          onPress={() => {
            fadeOut();
            setTimeout(() => {
              onClose?.();
            }, duration);
          }}
        >
          <Icon
            {...rightIcon}
            size="centi"
            name="close"
            type="material-community"
          />
        </DismissContainer>
      )}
      {timeout && (
        <ProgressBar
          valueNow={0}
          valueMax={100}
          valueMin={0}
          animate={true}
          color={colorVariant}
          colorTone="medium"
          animationParameters={{ direction: 'left', duration: timeout }}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
      )}
    </SnackbarContainer>
  );
};

export default Snackbar;
