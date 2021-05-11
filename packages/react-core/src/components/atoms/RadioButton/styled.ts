import styled from '@emotion/native';
import { TouchableWithoutFeedback, View } from 'react-native';
import { StyleProps } from '../../../index';

export const ViewContainerStyled = styled(View)`
  flex-direction: row;
`;

export const ButtonContainerStyled = styled(TouchableWithoutFeedback)<
  Partial<StyleProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.circle};
`;

export const ViewRadioStyled = styled(View)<Partial<StyleProps>>`
  height: 20px;
  width: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  margin: ${({ theme }) => theme.spacings.mili};
  border-color: ${({ theme }) => theme.colors.primary.medium};
  border-width: 2px;
`;

export const RadioContainer = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  align-items: center;
  justify-content: center;
`;

export const RadioChecked = styled(View)<Partial<StyleProps>>`
  height: 10px;
  width: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary.medium};
`;
