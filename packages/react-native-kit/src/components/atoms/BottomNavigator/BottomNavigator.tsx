import * as React from 'react';
import { ViewProps } from 'react-native';
import { StyledView, TabContainer } from './styled';
import Item, { BottomTabNavigatorItemProps } from './Item';

export interface BottomNavigatorProps<T extends string | number | symbol>
  extends ViewProps {
  selected: T;
  onSelect: (value: T) => void | never;
  children:
    | React.ReactElement<BottomTabNavigatorItemProps<T>>
    | React.ReactElement<BottomTabNavigatorItemProps<T>>[];
}

function BottomNavigator<T extends string | number | symbol>({
  selected,
  onSelect,
  children,
  ...rest
}: BottomNavigatorProps<T>): JSX.Element {
  return (
    <StyledView {...rest}>
      {React.Children.map(children, child => {
        const value = (child as React.ReactElement<
          BottomTabNavigatorItemProps<T>
        >).props.value;
        const isSelected = value == selected;

        return (
          <TabContainer selected={isSelected}>
            {React.cloneElement(child as React.ReactElement, {
              _selected: isSelected,
              onPress: () => onSelect(value),
            })}
          </TabContainer>
        );
      })}
    </StyledView>
  );
}

BottomNavigator.Item = Item;

export default BottomNavigator;
