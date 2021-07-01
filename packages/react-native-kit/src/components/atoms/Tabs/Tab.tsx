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
  const styledButtonColor = _selected ? 'primary' : undefined;
  const styledButtonTone = _selected ? 'xlight' : undefined;
  const styledButtonStyle = _selected
    ? undefined
    : { backgroundColor: 'transparent' };

  const iconColorVariant = _selected ? 'primary' : 'secondary';

  return (
    <StyledButton
      color={styledButtonColor}
      tone={styledButtonTone}
      style={styledButtonStyle}
      {...rest}
    >
      <Icon colorVariant={iconColorVariant} size={'centi'} {...icon} />
    </StyledButton>
  );
}

export default Tab;
