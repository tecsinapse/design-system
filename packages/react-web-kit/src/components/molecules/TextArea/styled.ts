import styled from '@emotion/native';
import {
  FontStackType,
  FontWeightType,
  StyleProps,
  TextAreaInputBase,
} from '@tecsinapse/react-core';
import { TextAreaProps } from './TextArea';

interface Font {
  fontStack?: FontStackType;
  fontWeight?: FontWeightType;
}

export const StyledWebInput = styled(TextAreaInputBase)<
  Font & Partial<TextAreaProps> & Partial<StyleProps>
>`
  font-weight: ${({ theme, fontWeight = 'regular' }) =>
    theme.font.weight[fontWeight]};
  font-family: ${({ theme, fontStack = 'default' }) =>
    `'${theme.font.stack[fontStack]}'`};
  outline-width: 0;
`;
