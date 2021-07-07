import styled from '@emotion/native';
import { View } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { RadioButtonProps } from './RadioButton';

export const IconWrapper = styled(View)<Partial<RadioButtonProps & StyleProps>>`
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.pill};
  border-color: ${({
    theme,
    color = 'primary',
    colorTone = 'medium',
  }: StyleProps & RadioButtonProps) => theme.color[color][colorTone]};
  border-width: ${({ theme }: StyleProps) => theme.borderWidth.nano};
  background-color: ${({ theme }: StyleProps) =>
    theme.miscellaneous.surfaceColor};
`;

export const ScaledView = styled(View)`
  transform: scale(0.8);
`;

export const IconViewStyled = styled(View)<Partial<StyleProps>>`
  padding: ${({ theme }: StyleProps) => theme.spacing.mili};
`;

export const ViewStyled = styled(View)`
  align-items: center;
  flex-direction: row;
`;
