import { ViewProps } from 'react-native';
import { StyledView, FloatingButton, Dummy } from './styled';
import { ButtonProps, Icon, IconProps } from '@tecsinapse/react-core';
import * as React from 'react';

type Attachable = ButtonProps & {
  icon: IconProps;
};

export interface HeaderProps extends ViewProps {
  rightButton?: Attachable;
  leftButton?: Attachable;
}

const Header: React.FC<HeaderProps> = ({
  rightButton,
  leftButton,
  children,
  ...rest
}) => {
  return (
    <StyledView {...rest}>
      {leftButton ? (
        <FloatingButton
          {...leftButton}
          variant={leftButton?.variant || 'filled'}
          color={leftButton?.color || 'primary'}
          size={leftButton?.size || 'small'}
        >
          {leftButton?.icon && <Icon {...leftButton?.icon} />}
        </FloatingButton>
      ) : (
        <Dummy disabled />
      )}
      {children}
      {rightButton ? (
        <FloatingButton
          {...rightButton}
          variant={rightButton?.variant || 'filled'}
          color={rightButton?.color || 'primary'}
          size={rightButton?.size || 'small'}
        >
          {rightButton?.icon && <Icon {...rightButton?.icon} />}
        </FloatingButton>
      ) : (
        <Dummy disabled />
      )}
    </StyledView>
  );
};

export default Header;
