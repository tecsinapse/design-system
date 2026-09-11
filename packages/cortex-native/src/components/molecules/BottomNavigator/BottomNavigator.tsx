import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../atoms/Text/Text';
import Item, { BottomNavigatorItemProps } from './Item';

export interface BottomNavigatorProps<T extends string | number | symbol>
  extends ViewProps {
  selected: T;
  onSelect: (value: T) => void | never;
  children:
    | React.ReactElement<BottomNavigatorItemProps<T>>
    | React.ReactElement<BottomNavigatorItemProps<T>>[];
}

function BottomNavigator<T extends string | number | symbol>({
  selected,
  onSelect,
  children,
  style,
  ...rest
}: BottomNavigatorProps<T>): React.ReactElement {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      {...rest}
      className="flex-row justify-between px-deca bg-surface-overlay"
      style={[style, { paddingBottom: 24 + bottom }]}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;

        const item = child as React.ReactElement<BottomNavigatorItemProps<T>>;
        const { value, label, labelProps, labelElement } = item.props;
        const isSelected = value === selected;

        return (
          <View
            className="flex-1 mx-mili pt-deca items-center justify-end border-primary-medium"
            style={{ borderTopWidth: isSelected ? 2 : 0 }}
          >
            <Pressable
              onPress={() => onSelect(value)}
              style={{ width: '100%', alignItems: 'center' }}
            >
              {React.cloneElement(item, {
                _selected: isSelected,
              })}
              {label && !labelElement && (
                <Text
                  colorVariant={
                    labelProps?.colorVariant || isSelected
                      ? 'primary'
                      : 'secondary'
                  }
                  typography={labelProps?.typography || 'sub'}
                  {...labelProps}
                >
                  {label}
                </Text>
              )}
              {labelElement && labelElement}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

BottomNavigator.Item = Item;

export default BottomNavigator;
