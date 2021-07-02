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
    margin-right: ${({ theme }) => theme.spacing.kilo};
`;

export const StyledContainerOpenMenu = webStyled('div')<Partial<StyleProps>>`
    border-top: 1px solid rgba(133, 128, 122, 0.08);
    min-height: 30vh;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(133, 128, 122, 0.08);

`;

export const StyledInput = nativeStyled(Input)<Partial<StyleProps>>`
 width: 100%;
`;

export const StyledGridContainer = webStyled('div')<Partial<StyleProps>>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  align-content: stretch;
  box-sizing: border-box;
   padding-right: 8vw;
   padding-left: 8vw;
   padding-top:  ${({ theme }) => theme.spacing.kilo};
   /* margin-bottom: ${({ theme }) => theme.spacing.kilo}; */
`;

export const StyledLeftComponent = webStyled('div')<Partial<StyleProps>>`
   margin-right: ${({ theme }) => theme.spacing.mili};
`;

export const StyledContainerMenu = webStyled('div')<Partial<StyleProps>>`
   flex-direction: row;
   display: flex;
   align-items: center;
   border-bottom: 1px solid rgba(133, 128, 122, 0.08);
   width: 100%;
   padding-bottom: ${({ theme }) => theme.spacing.mili};
   margin-bottom: ${({ theme }) => theme.spacing.mili};
 
`;

export const StyledContainerItems = webStyled('div')<Partial<StyleProps>>`
   display: flex;
   flex-direction: column;
`;

export const StyledContainerItemText = webStyled('div')<Partial<StyleProps>>`
   margin-bottom: ${({ theme }) => theme.spacing.mili};
`;
