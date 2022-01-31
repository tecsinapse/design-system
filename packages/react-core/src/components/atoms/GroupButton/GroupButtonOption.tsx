import React, { FC } from 'react';
import { Text, TextProps } from '../Text';
import { getStyledGroupItemText } from './styled';

export interface GroupButtonOptionProps {
  active: boolean;
  description: string;
  TextComponent?: FC<TextProps>;
}

const GroupButtonOption = ({
  TextComponent = Text,
  active,
  description,
}: GroupButtonOptionProps): JSX.Element => {
  const StyledText = getStyledGroupItemText(TextComponent);
  return (
    <StyledText fontWeight="bold" typography="sub" active={active}>
      {description}
    </StyledText>
  );
};

export default GroupButtonOption;
