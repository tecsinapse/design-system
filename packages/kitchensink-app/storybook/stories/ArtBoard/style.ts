import styled from "@emotion/native";
import { StyleProps } from "@tecsinapse/react-core/src";

export const StyledBoard = styled.View<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
  flex: 1;
`