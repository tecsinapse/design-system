import styled, { css } from '@emotion/native';
import { Pressable } from 'react-native';
import { CheckboxProps } from './Checkbox';
import { StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }) => css`
  width: ${theme.spacings.centi};
  height: ${theme.spacings.centi};
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius.nano};
  border-width: ${theme.borderWidth.pico};
  border-color: ${theme.colors.primary.medium};
  background-color: transparent;
`;

const checkBoxChecked = ({ theme, checked }: StyleProps & CheckboxProps) =>
  checked &&
  css`
    ${baseStyles({ theme })}
    background-color: ${theme.colors.primary.medium};
  `;

export const StyledCheckbox = styled(Pressable)<
  CheckboxProps & Partial<StyleProps>
>(baseStyles, checkBoxChecked);
