import styled from '@emotion/native';
import { StyleProps } from '../../../types/defaults';
import { extractNumbersFromString, RFValue, RFValueStr } from '../../../utils';
import { InputContainer, InputElement } from '../../atoms/Input';
import { TextAreaProps } from './TextArea';

export const StyledInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  min-height: ${RFValueStr('50px')};
`;

export const TextAreaInputBase = styled(InputElement)<
  Partial<TextAreaProps> & Partial<StyleProps>
>`
  max-height: ${({ theme, numberOfLines }) =>
    `${RFValue(
      extractNumbersFromString(theme.typography.h5.lineHeight) *
        (numberOfLines || 1)
    )}px`};
  width: 100%;
  padding: 0;
  margin: ${RFValueStr('3px')} 0;
`;
