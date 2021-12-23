import styled, { css } from "@emotion/native";
import { StyleProps } from "@tecsinapse/react-core";
import { Animated } from "react-native";

export const StyledPressableBackDrop = styled.Pressable<Partial<StyleProps>>`
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
`

export const BackDropView = styled(Animated.View)<Partial<StyleProps>>`
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
`

export const Test = styled(Animated.View)<Partial<StyleProps>>`
    /* transform: translateY(100px); */
    /* margin-bottom: -50%; */
`

export const CloseBar = styled.View<Partial<StyleProps>>`
    background-color: ${({ theme }) => theme.color.secondary.light};
    border-radius: 10px;
    margin: 5px auto;
    width: 42px;
    height: 5px;
`