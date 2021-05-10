import React, { FC } from 'react';
import {
  ButtonContainerStyled,
  RadioContainer,
  TextStyled,
  ViewContainerStyled,
  ViewRadioStyled,
  RadioChecked,
} from './styled';

export interface RadioButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const RadioButton: FC<RadioButtonProps> = ({
  onChange,
  checked,
  children,
}): JSX.Element => {
  const handleChange = () => {
    onChange(!checked);
  };
  return (
    <ViewContainerStyled>
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
      {children}
    </ViewContainerStyled>
  );
};

export default RadioButton;
