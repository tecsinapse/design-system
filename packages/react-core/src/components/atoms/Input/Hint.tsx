import React, { FC } from 'react';
import { ColorType } from '../../../types/defaults';
import { InputVariantType } from '../Input';
import { Text, TextProps } from '../Text';
import { StyledHintContainer, StyledHintIcon } from './styled';

interface HintProps {
  text?: string;
  variant: InputVariantType;
  TextComponent?: FC<TextProps>;
}

const Hint: FC<HintProps> = ({ variant, text, TextComponent = Text }) => {
  let color: ColorType;
  let icon;

  switch (variant) {
    case 'default':
      color = 'secondary';
      break;
    case 'error':
      color = 'error';
      icon = 'close-circle-outline';
      break;
    case 'success':
      color = 'success';
      icon = 'checkmark-circle-outline';
      break;
  }

  return (
    <StyledHintContainer>
      {icon && (
        <StyledHintIcon
          name={icon}
          type="ionicon"
          size="centi"
          colorVariant={color}
        />
      )}
      <TextComponent typography="label" colorVariant={color}>
        {text}
      </TextComponent>
    </StyledHintContainer>
  );
};

export default Hint;
