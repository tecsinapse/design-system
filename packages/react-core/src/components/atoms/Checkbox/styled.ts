import styled from '@emotion/native';
import { View } from 'react-native';
import { StyleProps } from '@tecsinapse/react-core';
import { CheckboxProps } from './Checkbox';

export const IconUncheckedStyled = styled(View)<
  Partial<CheckboxProps & StyleProps>
>`
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.micro};
  border-color: ${({
    theme,
    color = 'primary',
    colorTone = 'medium',
  }: StyleProps & CheckboxProps) => theme.color[color][colorTone]};
  border-width: ${({ theme }: StyleProps) => theme.borderWidth.nano};
  background-color: #fff;
`;

export const IconCheckedStyled = styled(View)<
  Partial<CheckboxProps & StyleProps>
>`
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.micro};
  border-color: ${({
    theme,
    color = 'primary',
    colorTone = 'medium',
  }: StyleProps & CheckboxProps) => theme.color[color][colorTone]};
  border-width: ${({ theme }: StyleProps) => theme.borderWidth.nano};
  background-color: ${({
    theme,
    color = 'primary',
    colorTone = 'medium',
  }: StyleProps & CheckboxProps) => theme.color[color][colorTone]};
`;

export const IconViewStyled = styled(View)<Partial<StyleProps>>`
  padding: ${({ theme }: StyleProps) => theme.spacing.mili};
`;

export const ViewStyled = styled(View)`
  align-items: center;
  flex-direction: row;
`;
