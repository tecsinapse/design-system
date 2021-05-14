import styled, { css } from '@emotion/native';
import { Pressable, View } from 'react-native';
import { CheckboxProps } from './Checkbox';
import { StyleProps, Text } from '@tecsinapse/react-core';

const baseStyles = ({ theme }: StyleProps) => css`
  width: ${theme.spacing.centi};
  height: ${theme.spacing.centi};
  justify-content: center;
  align-items: center;
  border-radius: ${theme.borderRadius.nano};
  border-width: ${theme.borderWidth.pico};
  border-color: ${theme.color.primary.medium};
  background-color: transparent;
`;

const checkBoxChecked = ({ theme, checked }: StyleProps & CheckboxProps) =>
  checked &&
  css`
    ${baseStyles({ theme })}
    background-color: ${theme.color.primary.medium};
  `;

export const ViewStyled = styled(View)<Partial<CheckboxProps & StyleProps>>`
  flex-direction: row;
`;

export const TextStyle = styled(Text)<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.centi};
`;

export const StyledCheckbox = styled(Pressable)<
  CheckboxProps & Partial<StyleProps>
>(baseStyles, checkBoxChecked);
