import styled from '@emotion/native';
import { View } from 'react-native';
import { StyleProps } from '@tecsinapse/react-core';
import { CheckboxProps } from './Checkbox';
import { Icon } from '../Icon';

export const IconUnckeckedStyled = styled(Icon)<
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

export const IconCheckedStyled = styled(Icon)<
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
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const IconViewStyled = styled(View)<Partial<StyleProps>>`
  padding: ${({ theme }: StyleProps) => theme.spacing.mili};
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ViewStyled = styled(View)`
  align-items: center;
  flex-direction: row;
`;
