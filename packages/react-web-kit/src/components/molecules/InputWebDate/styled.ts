import styled, { css } from '@emotion/native';
import { PressableSurface, StyleProps } from '@tecsinapse/react-core';
import { StyledInputElementBase } from '@tecsinapse/react-core/src/components/atoms/Input/styled';
import { FlatList } from 'react-native';

export const StyledWebTextInput = styled(StyledInputElementBase)`
  &:focus-visible {
    width: '100%';
  }
`;

export const TimeDigitContainer = styled(FlatList)`
  max-height: 100px;
  overflow-y: 'scroll';
`;

export const TimeCard = styled(PressableSurface)(
  (
    props: Partial<StyleProps> & ButtonBorders & { isSelected?: boolean }
  ) => css`
    background-color: ${props.isSelected
      ? props.theme?.color.primary.light
      : undefined};
    padding: ${props.theme?.spacing.centi};
    border-radius: ${props.theme?.borderRadius.mili};
    margin: ${props.theme?.spacing.mili};
    padding: ${props.theme?.spacing.mili} ${props.theme?.spacing.deca};
  `
);
