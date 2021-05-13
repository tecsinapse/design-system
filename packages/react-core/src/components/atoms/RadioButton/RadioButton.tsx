import React, { FC } from 'react';
import {
  ButtonContainerStyled,
  RadioContainer,
  ViewContainerStyled,
  ViewRadioStyled,
  RadioChecked,
} from './styled';

export interface RadioButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  labelPositon?: 'left' | 'right';
}

const RadioButton: FC<RadioButtonProps> = ({
  onChange,
  checked,
  children,
  labelPositon = 'right',
}): JSX.Element => {
  const handleChange = () => {
    onChange(true);
  };

  return (
    <ViewContainerStyled>
      {labelPositon === 'left' && children}
      <ButtonContainerStyled
        onPress={() => handleChange()}
        accessibilityRole="radio"
        accessibilityLiveRegion="polite"
      >
        <ViewRadioStyled>
          {checked ? (
            <RadioContainer>
              <RadioChecked />
            </RadioContainer>
          ) : null}
        </ViewRadioStyled>
      </ButtonContainerStyled>
      {labelPositon === 'right' && children}
    </ViewContainerStyled>
  );
};

export default RadioButton;
