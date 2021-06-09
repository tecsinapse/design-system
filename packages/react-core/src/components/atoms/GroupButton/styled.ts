import styled, { css } from '@emotion/native';
import { FC } from 'react';
import { StyleProps } from '../../../types/defaults';
import { ButtonSizeType } from '../Button';
import { PressableSurface } from '../PressableSurface';
import { TextProps } from '../Text';
import { GroupButtonOptions } from './GroupButton';
import { GroupButtonOptionProps } from './GroupButtonOption';

interface PressableOptions extends GroupButtonOptions {
  isActive: boolean;
  isFirstOption: boolean;
  isLastOption: boolean;
  buttonSize?: ButtonSizeType;
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
  isActive,
  activeBackgroundColor = 'secondary',
  activeBackgroundColorTone = 'medium',
  activeBorderColor = 'secondary',
  activeBorderColorTone = 'medium',
}: PressableOptions & Partial<StyleProps>) =>
  isActive &&
  css`
    background-color: ${theme?.color[activeBackgroundColor][
      activeBackgroundColorTone
    ]};
    border-color: ${theme?.color[activeBorderColor][activeBorderColorTone]};
  `;

const inactiveStyles = ({
  theme,
  isActive,
  inactiveBackgroundColor,
  inactiveBackgroundColorTone,
  inactiveBorderColor = 'secondary',
  inactiveBorderColorTone = 'light',
}: PressableOptions & Partial<StyleProps>) => {
  if (!isActive && inactiveBackgroundColor && inactiveBackgroundColorTone) {
    return css`
      background-color: ${theme?.color[inactiveBackgroundColor][
        inactiveBackgroundColorTone
      ]};
      border-color: ${theme?.color[inactiveBorderColor][
        inactiveBorderColorTone
      ]};
    `;
  }

  if (!isActive) {
    return css`
      background-color: ${theme?.miscellaneous.surfaceColor};
      border-color: ${theme?.color[inactiveBorderColor][
        inactiveBorderColorTone
      ]};
    `;
  }
};

const leftStyles = ({
  theme,
  isFirstOption,
}: PressableOptions & Partial<StyleProps>) =>
  isFirstOption &&
  css`
    border-top-left-radius: ${theme?.borderRadius.mili};
    border-bottom-left-radius: ${theme?.borderRadius.mili};
    border-left-width: ${theme?.borderWidth.pico};
  `;

const rightStyles = ({
  theme,
  isLastOption,
}: PressableOptions & Partial<StyleProps>) =>
  isLastOption &&
  css`
    border-top-right-radius: ${theme?.borderRadius.mili};
    border-bottom-right-radius: ${theme?.borderRadius.mili};
    border-right-width: ${theme?.borderWidth.pico};
  `;

const sizeStyles = ({
  theme,
  buttonSize = 'small',
}: PressableOptions & Partial<StyleProps>) => {
  switch (buttonSize) {
    case 'small':
      return css`
        padding: ${theme?.spacing.mili} ${theme?.spacing.deca};
        min-height: 34px;
      `;
    default:
      return css`
        padding: ${theme?.spacing.mili} ${theme?.spacing.kilo};
        min-height: 44px;
      `;
  }
};

const StyledPressableBase = styled(PressableSurface)<
  PressableOptions & Partial<StyleProps>
>`
  border-top-width: ${({ theme }) => theme.borderWidth.pico};
  border-bottom-width: ${({ theme }) => theme.borderWidth.pico};
  justify-content: center;
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
  (props: PressableOptions & Partial<StyleProps>) => css`
    ${activeStyles(props)}
    ${inactiveStyles(props)}
    ${leftStyles(props)}
    ${rightStyles(props)}
    ${sizeStyles(props)}
  `
);
