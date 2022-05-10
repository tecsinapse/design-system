import styled from '@emotion/native';
import {
  InputContainer,
  InputMaskElement,
  RFValueStr,
  StyleProps,
} from '@tecsinapse/react-core';
import { Font, fontStyles } from '../Text/styled';
import { InputMaskNativeProps } from './InputMask';

export const StyledInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  min-height: ${RFValueStr('50px')};
`;

const StyledNativeInputMaskBase = styled(InputMaskElement)<
  Partial<InputMaskNativeProps> & Partial<StyleProps>
>`
  height: ${({ theme }) => theme.typography.h5.lineHeight};
  width: 100%;
  padding: 0;
`;

export const StyledNativeInputMask = styled(StyledNativeInputMaskBase)<
  Font & Partial<InputMaskNativeProps> & Partial<StyleProps>
>(fontStyles);
