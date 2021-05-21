import styled from "@emotion/native";
import { InputContainerProps, InputElement, StyleProps } from "@tecsinapse/react-core";

export const StyledNativeInput = styled(InputElement)<Partial<StyleProps>>`
    height: ${({ theme }) => theme.typography.h5.lineHeight};
    width: 100%;
    padding: 0;
`

export const StyledBorderKeeper = styled.View<Partial<InputContainerProps> & Partial<StyleProps>>`
    padding: ${({ theme, focused }) => focused ? 0 : theme.borderWidth.pico};
    justify-content: center;
    align-items: center;
`