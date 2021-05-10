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
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  onChange: (checked: boolean) => void;

  checked: boolean;
}

const RadioButton: FC<RadioButtonProps> = ({
  onChange,
  checked,
  value,
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
      <TextStyled>{value}</TextStyled>
    </ViewContainerStyled>
  );
};

export default RadioButton;
