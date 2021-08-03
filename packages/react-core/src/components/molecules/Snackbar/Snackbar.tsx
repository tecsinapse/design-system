import React from 'react';
import {
  ColorGradationType,
  ColorType,
  Icon,
  IconProps,
  PressableSurface,
} from '@tecsinapse/react-core';
import { SnackbarContainer, ContentContainer, IconContainer } from './styled';

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
          colorVariant={colorVariant}
          colorTone={colorTone}
          elevated
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
            <PressableSurface effect="none" onPress={onClose}>
              <Icon
                {...rightIcon}
                size="centi"
                name="close"
                type="material-community"
              />
            </PressableSurface>
          )}
        </SnackbarContainer>
      )}
    </>
  );
};

export default Snackbar;
