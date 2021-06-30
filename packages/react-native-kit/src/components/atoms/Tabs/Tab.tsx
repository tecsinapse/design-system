import * as React from 'react';
import { ButtonProps, Icon, IconProps } from '@tecsinapse/react-core';
import { StyledButton } from './styled';

export interface TabProps<T extends string | number | symbol>
  extends Omit<ButtonProps, 'children'> {
  _selected?: boolean;
  value: T;
  icon: IconProps;
}

function Tab<T extends string | number | symbol>({
  _selected,
  icon,
  ...rest
}: TabProps<T>): JSX.Element {
  return (
    <StyledButton
      {...(_selected
        ? {
            color: 'primary',
            tone: 'xlight',
          }
        : {
            style: { backgroundColor: 'transparent' },
          })}
      {...rest}
    >
      <Icon
        {...(_selected
          ? {
              colorVariant: 'primary'
            }
          : {
              colorVariant: 'secondary',
            })}
        size={'centi'}
        {...icon}
      />
    </StyledButton>
  );
}

export default Tab;
