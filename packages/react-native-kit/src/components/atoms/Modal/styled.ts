import styled from "@emotion/native";
import { StyleProps } from "@tecsinapse/react-core";

export const BackDropView = styled.Pressable<Partial<StyleProps>>`
    background-color: rgba(0, 0, 0, .65);
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
`

export const CloseBar = styled.View<Partial<StyleProps>>`
    background-color: ${({ theme }) => theme.color.secondary.light};
    border-radius: 10px;
    margin: 5px auto;
    width: 42px;
    height: 5px;
`