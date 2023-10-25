import React, { ReactNode } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { Icon, IconProps } from '../../atoms/Icon';
import {
  ContentContainer,
  DismissContainer,
  IconContainer,
  SnackbarContainer,
  StyledContainerFlexRow,
  TextContainer,
} from './styled';

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
  /** Decides whether to show timeout progressbar (temporarily disabled) */
  showProgressBar?: boolean;
  leftIcon?: IconProps;
  /** Properties for close icon */
  rightIcon?: Omit<IconProps, 'name' | 'type'>;
  anchor?: 'top' | 'bottom';
  /** Distance from anchorage (results in px) */
  anchorDistance?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
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
}: SnackbarProps): JSX.Element => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const timeoutRef = React.useRef<NodeJS.Timeout>();

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

  return (
    <SnackbarContainer
      colorVariant={colorVariant}
      colorTone={colorTone}
      elevated
      anchor={anchor}
      anchorDistance={anchorDistance}
      visible={open}
      style={[{ opacity: fadeAnim as unknown as number }, style]}
      timeout={timeout}
    >
      <StyledContainerFlexRow>
        <ContentContainer>
          {leftIcon && (
            <IconContainer>
              <Icon {...leftIcon} size="centi" />
            </IconContainer>
          )}
          <TextContainer>{children}</TextContainer>
        </ContentContainer>
        {dismissable && (
          <DismissContainer effect="none" onPress={handleDismiss}>
            <Icon
              {...rightIcon}
              size="centi"
              name="close"
              type="material-community"
            />
          </DismissContainer>
        )}
      </StyledContainerFlexRow>
    </SnackbarContainer>
  );
};

export default Snackbar;
