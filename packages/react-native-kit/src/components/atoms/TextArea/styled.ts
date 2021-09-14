import styled from '@emotion/native';
import {
  extractNumbersFromString,
  InputContainer,
  InputElement,
  StyleProps,
} from '@tecsinapse/react-core';
import { Font, fontStyles } from '../Text/styled';
import { TextAreaProps } from './TextArea';
import { Text, TextNativeProps } from '../Text';

export const StyledInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  min-height: 50px;
`;

const StyledNativeInputBase = styled(InputElement)<
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

export const StyledNativeInput = styled(StyledNativeInputBase)<
  Font & Partial<TextAreaProps> & Partial<StyleProps>
>(fontStyles);

export const CharCountText = styled(Text)<TextNativeProps>`
  text-align: right;
`;
