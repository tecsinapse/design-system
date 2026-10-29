import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

import { DummyButton, type Attachable } from './FloatingButton';
import Left from './Left';
import Title from './Title';
import Right from './Right';

export type { Attachable } from './FloatingButton';

export interface HeaderProps extends ViewProps {
  /** @see Header.Right — composition alternative: `<Header.Root><Header.Right>…` */
  rightButton?: Attachable;
  /** @see Header.Left — composition alternative: `<Header.Root><Header.Left>…` */
  leftButton?: Attachable;
}

const HeaderRoot = ({
  rightButton,
  leftButton,
  children,
  className,
  style,
  ...rest
}: HeaderProps): React.ReactElement => (
  <View
    {...rest}
    className={cn('flex-row justify-between items-center px-deca w-full', className)}
    style={style}
  >
    {leftButton ? <Left button={leftButton} /> : <DummyButton />}
    {children}
    {rightButton ? <Right button={rightButton} /> : <DummyButton />}
  </View>
);

HeaderRoot.displayName = 'Header';

const Header = Object.assign(HeaderRoot, { Root: HeaderRoot, Left, Title, Right });

export default Header;
