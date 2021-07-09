import { default as webStyled } from '@emotion/styled';
import { default as nativeStyled } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

export const StyledIconInput = webStyled('div')<Partial<StyleProps>>`
  padding-top: calc(${({ theme }) => theme.spacing.centi} + 2px);
  padding-left: ${({ theme }) => theme.spacing.centi};
  padding-bottom: calc(${({ theme }) => theme.spacing.centi} - 2px);
  padding-right: ${({ theme }) => theme.spacing.centi};
`;

export const StyledMenuBar = webStyled('div')<Partial<StyleProps>>`
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.deca};
    box-shadow: 0px 2px 8px rgba(133, 128, 122, 0.08);
`;

export const StyledMenuButton = nativeStyled(Button)<Partial<StyleProps>>`
    padding-top: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-right: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-bottom: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-left: calc(${({ theme }) => theme.spacing.centi} + 2px);
    margin-right: 24px;
`;

export const StyledContainerOpenMenu = webStyled('div')<Partial<StyleProps>>`
    border-top: 1px solid rgba(133, 128, 122, 0.08);
    min-height: 10vh;
    background-color: #fff;
`;

export const StyledInput = nativeStyled(Input)<Partial<StyleProps>>`
 width: 100%;
`;
