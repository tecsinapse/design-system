import styled from "@emotion/native";
import { BoxContent, StyleProps } from "@tecsinapse/react-core";

export const CalendarBoxContent = styled(BoxContent)<Partial<StyleProps>>`
    background-color: ${({ theme }) => theme.color.secondary.xlight};
`