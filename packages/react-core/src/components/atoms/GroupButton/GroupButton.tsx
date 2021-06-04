import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  StyledDivider,
  StyledGroupButton,
  StyledOption,
  StyledPressable,
} from './styled';

export interface GroupButtonValue {
  id: any;
  description: string;
}

export interface GroupButtonProps<T> {
  value: T;
  options: T[];
  renderKey: (option?: T) => any;
  renderOption: (option: T, active: boolean) => JSX.Element;
  onChange: (option: T) => void;
  style?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
}

const GroupButton = <T extends any>({
  style,
  ...rest
}: GroupButtonProps<T>) => {
  return (
    <StyledGroupButton style={style}>{groupOptions(rest)}</StyledGroupButton>
  );
};

const groupOptions = <T extends any>({
  options,
  renderOption,
  renderKey,
  onChange,
  activeStyle,
  inactiveStyle,
  optionStyle,
  value,
}: Partial<GroupButtonProps<T>>) => {
  return options?.map((option, idx) => {
    const key = renderKey?.(option);
    const active = key === renderKey?.(value);
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;
    return (
      <StyledOption style={optionStyle} key={key}>
        <StyledPressable
          onPress={() => onChange?.(option)}
          active={active}
          isFirstOption={isFirst}
          isLastOption={isLast}
          style={active ? activeStyle : inactiveStyle}
        >
          {renderOption?.(option, active)}
        </StyledPressable>
        {!isLast && <StyledDivider />}
      </StyledOption>
    );
  });
};

export default GroupButton;
