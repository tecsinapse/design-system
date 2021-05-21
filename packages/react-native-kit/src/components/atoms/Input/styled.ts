import styled from "@emotion/native";
import { InputElement, StyleProps } from "@tecsinapse/react-core";

export const StyledNativeInput = styled(InputElement)<Partial<StyleProps>>`
    height: ${({ theme }) => theme.typography.h5.lineHeight};
    width: 100%;
    padding: 0;
`