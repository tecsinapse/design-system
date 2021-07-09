import { default as webStyled } from '@emotion/styled';
import { Card, StyleProps } from '@tecsinapse/react-core';
import { default as nativeStyled } from '@emotion/native';

export const StyledCardContainer = webStyled('div')<Partial<StyleProps>>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: ${({ theme }) => theme.spacing.mega};
    margin-bottom: ${({ theme }) => theme.spacing.kilo};
    margin-top: ${({ theme }) => theme.spacing.centi};
`;

export const StyledCard = nativeStyled(Card)<Partial<StyleProps>>`
    padding-top: ${({ theme }) => theme.spacing.mili};
    padding-bottom: ${({ theme }) => theme.spacing.mili};
    padding-left: ${({ theme }) => theme.spacing.deca};
    padding-right: ${({ theme }) => theme.spacing.deca};
`;
