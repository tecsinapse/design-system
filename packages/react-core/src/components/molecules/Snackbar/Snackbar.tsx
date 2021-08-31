import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { Icon, IconProps } from '../../atoms/Icon';
import {
  Container,
  ContentContainer,
  DismissContainer,
  IconContainer,
  SnackbarContainer,
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
  const [visible, setVisible] = React.useState<boolean>(true);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };
  React.useEffect(() => {
    fadeIn();
    if (open && timeout) {
      setTimeout(() => onClose?.(), timeout);
      fadeOut();
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
      visible={visible}
    >
      <Container style={{ opacity: (fadeAnim as unknown) as number }}>
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
              onClose?.();
              // setTimeout(() => {
              //   // setVisible(false);
              // }, 2000);
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
      </Container>
    </SnackbarContainer>
  );
};

export default Snackbar;
