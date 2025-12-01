import * as React from 'react';
import { ViewProps } from 'react-native';
import { StyledView, TabContainer } from './styled';
import Item, { BottomNavigatorItemProps } from './Item';
import { Text } from '../Text';

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
  ...rest
}: BottomNavigatorProps<T>): React.ReactElement {
  return (
    <StyledView {...rest}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null;

        const item = child as React.ReactElement<BottomNavigatorItemProps<T>>;
        const { value, label, labelProps, labelElement } = item.props;
        const isSelected = value === selected;

        return (
          <TabContainer selected={isSelected} onPress={() => onSelect(value)}>
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
          </TabContainer>
        );
      })}
    </StyledView>
  );
}

BottomNavigator.Item = Item;

export default BottomNavigator;
