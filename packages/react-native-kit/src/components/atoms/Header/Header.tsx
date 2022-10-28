import { ViewProps } from 'react-native';
import { StyledView, FloatingButton, Dummy } from './styled';
import { ButtonProps, Icon, IconProps } from '@tecsinapse/react-core';
import * as React from 'react';
import Badge from '../Badge/Badge';
import { FC } from 'react';

export type Attachable = ButtonProps & {
  icon: IconProps;
  valueBagde?: number;
};

export interface HeaderProps extends ViewProps {
  rightButton?: Attachable;
  leftButton?: Attachable;
}

export interface ButtonBaseProps extends ViewProps {
  button?: Attachable;
}

const Header: React.FC<HeaderProps> = ({
  rightButton,
  leftButton,
  children,
  ...rest
}) => {
  const ButtonBase: FC<ButtonBaseProps> = ({ button }) => (
    <FloatingButton
      {...button}
      variant={button?.variant || 'filled'}
      color={button?.color || 'primary'}
      size={button?.size || 'small'}
    >
      {button?.icon && <Icon {...button?.icon} />}
    </FloatingButton>
  );

  return (
    <StyledView {...rest}>
      {leftButton ? (
        <>
          {leftButton?.valueBagde ? (
            <Badge value={leftButton.valueBagde} color={'error'}>
              <ButtonBase button={leftButton} />
            </Badge>
          ) : (
            <ButtonBase button={leftButton} />
          )}
        </>
      ) : (
        <Dummy disabled />
      )}
      {children}
      {rightButton ? (
        <>
          {rightButton?.valueBagde ? (
            <Badge value={rightButton.valueBagde} color={'error'}>
              <ButtonBase button={rightButton} />
            </Badge>
          ) : (
            <ButtonBase button={rightButton} />
          )}
        </>
      ) : (
        <Dummy disabled />
      )}
    </StyledView>
  );
};

export default Header;
