import styled, { css } from '@emotion/native';
import { FC } from 'react';
import { Platform, PressableProps, ViewProps } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { PressableSurface } from '../../atoms/PressableSurface';
import { TextProps } from '../../atoms/Text';

const isWeb = Platform.OS === 'web';

interface ButtonBorders {
  isLeft?: boolean;
  isRright?: boolean;
}

export const TitleContainer = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.secondary.xlight};
`;

const surfaceBorderRight = ({
  isRright,
  theme,
}: ButtonBorders & Partial<StyleProps>) =>
  !isWeb &&
  isRright &&
  css`
    border-top-right-radius: ${theme?.borderRadius.deca};
  `;

const surfaceBorderLeft = ({
  isLeft,
  theme,
}: ButtonBorders & Partial<StyleProps>) =>
  !isWeb &&
  isLeft &&
  css`
    border-top-left-radius: ${theme?.borderRadius.deca};
  `;

export const Control = styled(PressableSurface)(
  (
    props: Partial<StyleProps> & ButtonBorders & { align: 'start' | 'end' }
  ) => css`
    align-items: flex-${props.align};
    padding: ${props.theme?.spacing.centi};
    border-radius: ${props.theme?.borderRadius.mili};
    margin: ${props.theme?.spacing.mili};
    ${surfaceBorderRight(props)}
    ${surfaceBorderLeft(props)}
  `
);

export const getCapitalizedTextComponent = (component: FC<TextProps>) => {
  return styled(component)`
    text-transform: capitalize;
  `;
};

export const Content = styled.View<ViewProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
`;

export const Week = styled.View<Partial<StyleProps>>`
  flex-direction: row;
`;

export const Selected = styled.View<
  Partial<StyleProps> & { selected: boolean }
>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.primary.medium : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  width: 100%;
  height: 100%;
`;

export const Cell = styled(PressableSurface)<
  PressableProps &
    Partial<StyleProps> & {
      selected: boolean;
      highlighted: boolean;
      isLineEnd: boolean;
      isLineStart: boolean;
      isRangeStart: boolean;
      isRangeEnd: boolean;
    }
>(
  ({
    theme,
    selected,
    highlighted,
    isLineEnd,
    isLineStart,
    isRangeStart,
    isRangeEnd,
  }) => {
    const borderRadiusSize = theme.borderRadius.mili;

    const { rightBorderRadius, leftBorderRadius } = {
      rightBorderRadius:
        (selected && !isRangeStart) || isLineEnd ? borderRadiusSize : 0,
      leftBorderRadius:
        (selected && !isRangeEnd) || isLineStart ? borderRadiusSize : 0,
    };

    const borderEffect = highlighted ? 0 : borderRadiusSize;

    const backgroundColor = highlighted
      ? theme.color.primary.light
      : 'transparent';

    return css`
      ${isWeb
        ? css`
            width: 32px;
            height: 32px;
          `
        : css`
            aspect-ratio: 1;
            flex: 1;
          `}
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${borderEffect};
      border-top-left-radius: ${leftBorderRadius};
      border-bottom-left-radius: ${leftBorderRadius};
      border-top-right-radius: ${rightBorderRadius};
      border-bottom-right-radius: ${rightBorderRadius};
      background-color: ${backgroundColor};
    `;
  }
);
