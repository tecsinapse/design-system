import styled from "@emotion/native";
import { InputContainer, InputElement, StyleProps } from "@tecsinapse/react-core";

export const StyledWebTextInput = styled(InputElement)<Partial<StyleProps>>`
  &:focus-visible {
    outline-width: 0;
  }
`

export const StyledWebInputContainer = styled(InputContainer)<Partial<StyleProps>>`
  box-sizing: initial;
  min-height: auto;
`