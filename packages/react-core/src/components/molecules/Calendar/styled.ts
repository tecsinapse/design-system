import styled, { css } from '@emotion/native';
import { Text } from '../../atoms/Text';
import { StyleProps } from '../../../types/defaults';
import { PressableProps, ViewProps } from 'react-native';

export const TitleContainer = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.secondary.xlight};
`;

export const Control = styled.Pressable<
  Partial<StyleProps> & { align: 'start' | 'end' }
>`
  flex-grow: 1;
  align-items: flex-${({ align }) => align};
  padding: ${({ theme }) => theme.spacing.deca};
`;

export const Capitalized = styled(Text)`
  text-transform: capitalize;
`;

export const Content = styled.View<ViewProps & Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.deca};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
`;

export const Week = styled.View<Partial<StyleProps>>`
  flex-direction: row;
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
      flex: 1;
      border-top-left-radius: ${leftBorderRadius};
      border-bottom-left-radius: ${leftBorderRadius};
      border-top-right-radius: ${rightBorderRadius};
      border-bottom-right-radius: ${rightBorderRadius};
      background-color: ${backgroundColor};
    `;
  }
);
