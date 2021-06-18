import styled from "@emotion/native";
import { StyleProps } from "../../../types/defaults";
import { Button } from '../../atoms/Button';

export const StyledPasswordButtonIcon = styled(Button)<Partial<StyleProps>>`
    padding: ${({ theme }) => theme.spacing.centi};
`