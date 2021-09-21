import styled from '@emotion/native';
import {
  extractNumbersFromString,
  InputContainer,
  InputElement,
  StyleProps,
} from '@tecsinapse/react-core';
import { TextAreaProps } from './TextArea';

export const StyledInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  min-height: 50px;
`;

export const TextAreaInputBase = styled(InputElement)<
  Partial<TextAreaProps> & Partial<StyleProps>
>`
  max-height: ${({ theme, numberOfLines }) =>
    `${
      extractNumbersFromString(theme.typography.h5.lineHeight) *
      (numberOfLines || 1)
    }px`};
  width: 100%;
  padding: 0;
  margin: 3px 0;
`;
