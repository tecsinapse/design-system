import styled from '@emotion/native';
import { InputMaskElement, StyleProps } from '@tecsinapse/react-core';

export const StyledWebTextInputMask = styled(InputMaskElement)<
  Partial<StyleProps>
>`
  &:focus-visible {
    outline-width: 0;
  }
`;
