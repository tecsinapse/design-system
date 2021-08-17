import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { Icon, IconProps } from '../../atoms/Icon';
import {
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
  React.useEffect(() => {
    if (open && timeout) {
      setTimeout(() => onClose?.(), timeout);
    }
  }, [open, timeout]);

  return (
    <>
      {open && (
        <SnackbarContainer
          {...rest}
          colorVariant={colorVariant}
          colorTone={colorTone}
          elevated
          anchor={anchor}
          anchorDistance={anchorDistance}
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
            <DismissContainer effect="none" onPress={onClose}>
              <Icon
                {...rightIcon}
                size="centi"
                name="close"
                type="material-community"
              />
            </DismissContainer>
          )}
        </SnackbarContainer>
      )}
    </>
  );
};

export default Snackbar;
