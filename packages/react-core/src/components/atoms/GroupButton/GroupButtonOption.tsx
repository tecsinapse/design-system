import React, { FC } from 'react';
import { Text, TextProps } from '../Text';
import { getStyledGroupItemText } from './styled';

export interface GroupButtonOptionProps<T> {
  active: boolean;
  description: string;
  TextComponent?: FC<TextProps>;
}

const GroupButtonOption = <T extends any>({
  TextComponent = Text,
  active,
  description,
}: GroupButtonOptionProps<T>) => {
  const StyledText = getStyledGroupItemText(TextComponent);
  return (
    <StyledText fontWeight="bold" typography="sub" active={active}>
      {description}
    </StyledText>
  );
};

export default GroupButtonOption;
