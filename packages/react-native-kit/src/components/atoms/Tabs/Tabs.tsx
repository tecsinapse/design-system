import * as React from 'react';
import { ViewProps } from 'react-native';
import { StyledView, TabContainer } from './styled';
import { TabProps } from './Tab';

export interface TabsProps<T extends string | number | symbol>
  extends ViewProps {
  selected: T;
  onSelect: (value: T) => void | never;
  children: React.ReactElement<TabProps<T>> | React.ReactElement<TabProps<T>>[];
}

function Tabs<T extends string | number | symbol>({
  selected,
  onSelect,
  children,
  ...rest
}: TabsProps<T>): JSX.Element {
  return (
    <StyledView {...rest}>
      {React.Children.map(children, child => {
        const value = (child as React.ReactElement<TabProps<T>>).props.value;
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

export default Tabs;
