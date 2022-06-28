import styled from '@emotion/native';
import {
  InputElement, StyleProps
} from '@tecsinapse/react-core';
import { Font, fontStyles } from '../Text/styled';
import { InputNativeProps } from './Input';

const StyledNativeInputBase = styled(InputElement)<
  Partial<InputNativeProps> & Partial<StyleProps>
>`
  height: ${({ theme }) => theme.typography.h5.lineHeight};
  width: 100%;
  padding: 0;
`;

export const StyledNativeInput = styled(StyledNativeInputBase)<
  Font & Partial<InputNativeProps> & Partial<StyleProps>
>(fontStyles);
