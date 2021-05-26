import {
  InputContainerProps,
  InputElementProps,
  StyledBorderKeeper,
  useInputFocus,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { StyledWebInputContainer, StyledWebTextInput } from './styled';

export interface InputWebProps
  extends Omit<InputElementProps, 'style'>,
    InputContainerProps {}

export const Input: FC<InputWebProps> = ({
  label,
  labelColorVariant,
  labelTypografy,
  labelStack,
  labelWeight,
  leftComponent,
  rightComponent,
  disabled,
  style,
  borderColor,
  borderColorGradation,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  return (
    <StyledBorderKeeper focused={focused}>
      <StyledWebInputContainer
        label={label}
        labelColorVariant={labelColorVariant}
        labelTypografy={labelTypografy}
        labelStack={labelStack}
        labelWeight={labelWeight}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        borderColor={borderColor}
        borderColorGradation={borderColorGradation}
        style={style}
        focused={focused}
        disabled={disabled}
      >
        <StyledWebTextInput
          {...rest}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </StyledWebInputContainer>
    </StyledBorderKeeper>
  );
};

export default Input;
