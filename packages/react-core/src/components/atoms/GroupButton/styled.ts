import styled, { css } from '@emotion/native';
import {
  GroupButtonOptionProps,
  PressableSurface,
  StyleProps,
  TextProps,
} from '@tecsinapse/react-core';
import { FC } from 'react';

interface PressableOption {
  active: boolean;
  isFirstOption: boolean;
  isLastOption: boolean;
}

export const StyledGroupButton = styled.View<Partial<StyleProps>>`
  flex-direction: row;
`;

export const getStyledGroupItemText = (component: FC<TextProps>) => {
  return styled(component)<
    Partial<GroupButtonOptionProps<any>> & Partial<StyleProps>
  >`
    color: ${({ active, theme }) =>
      active ? theme.miscellaneous.surfaceColor : theme.color.secondary.medium};
  `;
};

const activeStyles = ({
  theme,
  active,
}: PressableOption & Partial<StyleProps>) =>
  active &&
  css`
    background-color: ${theme?.color.secondary.medium};
    border-color: ${theme?.color.secondary.medium};
  `;

const inactiveStyles = ({
  theme,
  active,
}: PressableOption & Partial<StyleProps>) =>
  !active &&
  css`
    background-color: ${theme?.miscellaneous.surfaceColor};
    border-color: ${theme?.color.secondary.light};
  `;

const leftStyles = ({
  theme,
  isFirstOption,
}: PressableOption & Partial<StyleProps>) =>
  isFirstOption &&
  css`
    border-top-left-radius: ${theme?.borderRadius.mili};
    border-bottom-left-radius: ${theme?.borderRadius.mili};
    border-left-width: ${theme?.borderWidth.pico};
  `;

const rightStyles = ({
  theme,
  isLastOption,
}: PressableOption & Partial<StyleProps>) =>
  isLastOption &&
  css`
    border-top-right-radius: ${theme?.borderRadius.mili};
    border-bottom-right-radius: ${theme?.borderRadius.mili};
    border-right-width: ${theme?.borderWidth.pico};
  `;

const StyledPressableBase = styled(PressableSurface)<
  PressableOption & Partial<StyleProps>
>`
  border-top-width: ${({ theme }) => theme.borderWidth.pico};
  border-bottom-width: ${({ theme }) => theme.borderWidth.pico};
  padding: ${({ theme }) => theme.spacing.mili}
    ${({ theme }) => theme.spacing.deca};
  align-items: center;
  flex: 1;
`;

export const StyledOption = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const StyledDivider = styled.View<Partial<StyleProps>>`
  width: ${({ theme }) => theme.borderWidth.pico};
  background-color: ${({ theme }) => theme.color.secondary.light}; ;
`;

export const StyledPressable = styled(StyledPressableBase)(
  (props: PressableOption & Partial<StyleProps>) => css`
    ${activeStyles(props)}
    ${inactiveStyles(props)}
    ${leftStyles(props)}
    ${rightStyles(props)}
  `
);
