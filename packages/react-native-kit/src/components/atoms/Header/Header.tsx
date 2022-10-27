import { ViewProps } from 'react-native';
import { StyledView, FloatingButton, Dummy } from './styled';
import { ButtonProps, Icon, IconProps } from '@tecsinapse/react-core';
import * as React from 'react';
import Badge from '../Badge/Badge';
import { FC } from 'react';

type Attachable = ButtonProps & {
  icon: IconProps;
  valueBagde?: number;
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
  const ButtonBase: FC = () => (
    <FloatingButton
      {...rightButton}
      variant={rightButton?.variant || 'filled'}
      color={rightButton?.color || 'primary'}
      size={rightButton?.size || 'small'}
    >
      {rightButton?.icon && <Icon {...rightButton?.icon} />}
    </FloatingButton>
  );

  return (
    <StyledView {...rest}>
      {leftButton ? (
        <>
          {leftButton?.valueBagde ? (
            <Badge value={leftButton.valueBagde} color={'error'}>
              <ButtonBase />
            </Badge>
          ) : (
            <ButtonBase />
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
              <ButtonBase />
            </Badge>
          ) : (
            <ButtonBase />
          )}
        </>
      ) : (
        <Dummy disabled />
      )}
    </StyledView>
  );
};

export default Header;
