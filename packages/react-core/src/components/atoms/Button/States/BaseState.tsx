import {
  Icon,
  IconSizeType,
  Text,
  TypographyVariationType,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { ButtonStateProps } from '../Button';
import { getStyledTextButton } from './styled';

export interface BaseStateProps extends ButtonStateProps {
  icon: string;
}

export const BaseState: FC<BaseStateProps> = ({
  textComponent = Text,
  buttonSize = 'default',
  fontColor = 'light',
  icon,
  text,
}) => {
  const typo: TypographyVariationType =
    buttonSize === 'default' ? 'base' : 'sub';
  const iconSize: IconSizeType = buttonSize === 'default' ? 'deca' : 'centi';
  const StyledText = getStyledTextButton(textComponent);
  return (
    <>
      <Icon name={icon} type="ionicon" fontColor={fontColor} size={iconSize} />
      {text && (
        <StyledText typography={typo} fontWeight="bold" fontColor={fontColor}>
          {text}
        </StyledText>
      )}
    </>
  );
};

export default BaseState;
