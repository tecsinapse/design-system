import styled from "@emotion/styled";
import { Input } from "@tecsinapse/react-core";

export const StyledInput = styled(Input)`
    &:focus {
      outline-width: ${({ theme }) => theme.borderWidth.nano};
      outline-color: ${({ theme, color = "secondary" }) => theme.color[color].medium};
    }
`