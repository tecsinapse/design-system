import styled from '@emotion/native';
import { TouchableWithoutFeedback, View } from 'react-native';
import { StyleProps } from '../../../index';

export const ViewContainerStyled = styled(View)`
  flex-direction: row;
`;

export const ButtonContainerStyled = styled(TouchableWithoutFeedback)<
  Partial<StyleProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
`;

export const ViewRadioStyled = styled(View)<Partial<StyleProps>>`
  height: 20px;
  width: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  margin: ${({ theme }) => theme.spacing.mili};
  border-color: ${({ theme }) => theme.color.primary.medium};
  border-width: 2px;
  cursor: pointer;
  background-color: #fff;
`;

export const RadioContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export const RadioChecked = styled(View)<Partial<StyleProps>>`
  height: 10px;
  width: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.color.primary.medium};
`;
