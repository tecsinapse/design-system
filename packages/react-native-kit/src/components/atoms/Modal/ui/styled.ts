import styled from "@emotion/native";
import { StyleProps } from "@tecsinapse/react-core";
import { Animated } from "react-native";

export const StyledPressableBackDrop = styled.Pressable<Partial<StyleProps>>`
    flex: 1;
    position: absolute;
    width: 100%;
    height: 100%;
`

export const BackDropView = styled(Animated.View)<{ height: number } & Partial<StyleProps>>`
    height: 100%;
`

export const CloseBar = styled.View<Partial<StyleProps>>`
    background-color: ${({ theme }) => theme.color.secondary.light};
    border-radius: 10px;
    margin: 5px auto;
    width: 42px;
    height: 5px;
`