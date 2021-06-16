import styled from '@emotion/native';
import {
  InputContainer,
  InputElement,
  StyleProps,
} from '@tecsinapse/react-core';
import { Font, fontStyles } from '../Text/styled';
import { InputNativebProps } from './Input';

export const StyledInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  min-height: 50px;
`;

const StyledNativeInputBase = styled(InputElement)<
  Partial<InputNativebProps> & Partial<StyleProps>
>`
  height: ${({ theme }) => theme.typography.h5.lineHeight};
  width: 100%;
  padding: 0;
`;

export const StyledNativeInput = styled(StyledNativeInputBase)<
  Font & Partial<InputNativebProps> & Partial<StyleProps>
>(fontStyles);
