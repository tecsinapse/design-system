import * as React from 'react';
import { View, ViewProps } from 'react-native';
import Icon, { IconProps } from '../../atoms/Icon/Icon';
import { TextProps } from '../../atoms/Text/Text';

type ValueType = string | number | symbol;

export interface BottomNavigatorItemProps<T extends ValueType>
  extends Omit<ViewProps, 'children'> {
  _selected?: boolean;
  value: T;
  icon?: IconProps;
  label?: string;
  labelProps?: TextProps;
  labelElement?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

type ItemPropsWithIcon<T extends ValueType> = Omit<
  BottomNavigatorItemProps<T>,
  'children'
>;

type ItemPropsWithChildren<T extends ValueType> = Omit<
  BottomNavigatorItemProps<T>,
  'icon' | 'label' | 'labelElement' | 'labelProps'
>;

function Item<T extends ValueType>(props: ItemPropsWithChildren<T>): React.ReactElement;
function Item<T extends ValueType>(props: ItemPropsWithIcon<T>): React.ReactElement;
function Item<T extends ValueType>({
  _selected,
  icon,
  children,
  style,
  ...rest
}: Partial<BottomNavigatorItemProps<T>>): React.ReactElement {
  const styledButtonStyle = _selected
    ? undefined
    : { backgroundColor: 'transparent' };

  const iconColorVariant = _selected ? 'primary' : 'secondary';

  if (icon) {
    return (
      <View
        className="aspect-square justify-center items-center min-h-[48px] bg-primary-xlight rounded-mili"
        style={[styledButtonStyle, style]}
        {...rest}
      >
        <Icon colorVariant={iconColorVariant} size="centi" {...icon} />
      </View>
    );
  } else {
    return <View style={style} {...rest}>{children}</View>;
  }
}

export default Item;
