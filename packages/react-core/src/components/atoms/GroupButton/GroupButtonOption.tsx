import { Text, TextProps } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { getStyledGroupItemText } from './styled';

export interface GroupButtonOptionProps<T> {
  active: boolean;
  description: string;
  TextElement?: FC<TextProps>;
}

const GroupButtonOption = <T extends any>({
  TextElement = Text,
  active,
  description,
}: GroupButtonOptionProps<T>) => {
  const StyledText = getStyledGroupItemText(TextElement);
  return (
    <StyledText fontWeight="bold" typography="sub" active={active}>
      {description}
    </StyledText>
  );
};

export default GroupButtonOption;
