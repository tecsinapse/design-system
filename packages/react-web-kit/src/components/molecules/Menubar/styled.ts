import { default as webStyled } from '@emotion/styled';
import { default as nativeStyled } from '@emotion/native';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

export const StyledIconInput = webStyled('div')<Partial<StyleProps>>`
  padding-top: calc(${({ theme }) => theme.spacing.centi} + 2px);
  padding-left: ${({ theme }) => theme.spacing.centi};
  padding-bottom: calc(${({ theme }) => theme.spacing.centi} - 2px);
  padding-right: ${({ theme }) => theme.spacing.centi};
`;

export const StyledMenuBar = webStyled('div')<Partial<StyleProps>>`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.header};
    background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing.deca} ${theme.spacing.kilo}`};
    box-shadow: 0px 2px 8px ${({ theme }) =>
      hex2rgba(theme.miscellaneous.shadow, 0.08)};
`;

export const StyledMenuButton = nativeStyled(Button)<Partial<StyleProps>>`
    padding-top: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-right: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-bottom: calc(${({ theme }) => theme.spacing.centi} + 2px);
    padding-left: calc(${({ theme }) => theme.spacing.centi} + 2px);
    margin-right: ${({ theme }) => theme.spacing.kilo};
    & * {
      user-select: none;
    }
`;

export const StyledContainerOpenMenu = webStyled('div')<Partial<StyleProps>>`
    border-top: ${({ theme }) =>
      `${theme.borderWidth.pico} solid ${hex2rgba(
        theme.miscellaneous.shadow,
        0.08
      )}`};
    background-color: ${({ theme }) => theme.miscellaneous.surfaceColor}; 
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.mili}; 
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.mili};
    box-shadow: 0px 2px 8px ${({ theme }) =>
      hex2rgba(theme.miscellaneous.shadow, 0.08)};
    padding-right: 8vw;
    padding-left: 8vw;
    padding-top: ${({ theme }) => theme.spacing.kilo};
    padding-bottom: ${({ theme }) => theme.spacing.mega};
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.header - 1};
    width: -webkit-fill-available;
    width: -moz-available;
`;

export const StyledInput = nativeStyled(Input)<Partial<StyleProps>>`
     width: 100%;
`;

export const StyledInputContainer = webStyled('div')`
    display: flex;
    flex: 1;
`;

export const StyledSearchResultsContainer = webStyled('div')`
    display: flex;
    flex-direction: column;
`;

export const StyledSearchTextContainer = webStyled('div')<Partial<StyleProps>>`
    margin-bottom: ${({ theme }) => theme.spacing.mili};
`;
