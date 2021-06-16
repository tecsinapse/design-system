import styled from '@emotion/native';
import { InputElement, StyleProps } from '@tecsinapse/react-core';

export const StyledWebTextInput = styled(InputElement)<Partial<StyleProps>>`
  &:focus-visible {
    outline-width: 0;
  }
`;
