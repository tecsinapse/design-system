import styled, { css } from '@emotion/native';
import { PressableSurface, StyleProps, Text } from '@tecsinapse/react-core';
import { FlatList } from 'react-native';

export const StyledTextLabel = styled(Text)`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

export const TimeDigitContainer = styled(FlatList<string>)`
  max-height: 150px;
  overflow-y: scroll;
`;

export const TimeCard = styled(PressableSurface)(
  (props: Partial<StyleProps> & { isSelected?: boolean }) => css`
    background-color: ${props.isSelected
      ? props.theme?.color.primary.light
      : undefined};
    padding: ${props.theme?.spacing.centi};
    border-radius: ${props.theme?.borderRadius.mili};
    margin: ${props.theme?.spacing.mili};
    padding: ${props.theme?.spacing.mili} ${props.theme?.spacing.deca};
  `
);

export const Root = styled.View<Partial<StyleProps>>`
  position: relative;
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
`;
export const Content = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.deca};
  margin-bottom: ${({ theme }) => theme.spacing.deca};
`;

export const BackButton = styled(PressableSurface)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  padding: ${({ theme }) => theme.spacing.micro};
  margin-right: ${({ theme }) => theme.spacing.mili};
  aspect-ratio: 1;
`;

export const Header = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.mili};
  margin-bottom: ${({ theme }) => theme.spacing.mili};
`;
