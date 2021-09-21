import styled from '@emotion/native';
import { StyleProps, TextAreaInputBase } from '@tecsinapse/react-core';
import { Font, fontStyles } from '../Text/styled';
import { TextAreaProps } from './TextArea';

export const StyledNativeInput = styled(TextAreaInputBase)<
  Font & Partial<TextAreaProps> & Partial<StyleProps>
>(fontStyles);
