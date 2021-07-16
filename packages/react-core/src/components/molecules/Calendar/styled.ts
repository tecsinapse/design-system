import styled, { css } from '@emotion/native';
import { Text, TextProps } from '../../atoms/Text';
import { StyleProps } from '@tecsinapse/react-core';
import { PressableProps, ViewProps } from 'react-native';

export const Root = styled.View``;

export const Button = styled.Pressable``;

export const TitleContainer = styled.View``;

export const Title = styled(Text)``;

export const Content = styled.View``;

export const Week = styled.View`
  flex-direction: row;
`;

export const DayOfWeek = styled(Text)``;

export const DayOfMonth = styled(Text)<
  TextProps & Partial<StyleProps> & { selected: boolean }
>`
  color: ${({ theme, selected }) =>
    selected ? theme.miscellaneous.surfaceColor : theme.miscellaneous.overlay};
`;

export const Cell = styled.Pressable<
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

    const backgroundColor = selected
      ? theme.color.primary.medium
      : highlighted
      ? theme.color.primary.light
      : 'transparent';

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      width: ${theme.spacing.mega};
      border-top-left-radius: ${leftBorderRadius};
      border-bottom-left-radius: ${leftBorderRadius};
      border-top-right-radius: ${rightBorderRadius};
      border-bottom-right-radius: ${rightBorderRadius};
      background-color: ${backgroundColor};
    `;
  }
);
