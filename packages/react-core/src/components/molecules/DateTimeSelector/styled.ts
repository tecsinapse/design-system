import styled from '@emotion/native';
import { StyleProps } from '../../../types/defaults';

export const Root = styled.View<Partial<StyleProps>>`
  position: relative;
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
`;

export const Content = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${({ theme }) => theme.spacing.deca};
`;

export const SelectorRoot = styled.View<Partial<StyleProps>>`
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.secondary.xlight};
  border-radius: ${({ theme }) => theme.borderRadius.micro};
  padding-vertical: ${({ theme }) => theme.spacing.kilo};
`;

export const SelectorValue = styled.View`
  align-items: center;
`;

export const SelectorContainer = styled.View<
  Partial<StyleProps> & { isFirst?: boolean; isLast?: boolean }
>`
  margin-right: ${({ theme, isFirst }) => (isFirst ? theme.spacing.deca : 0)};
  margin-left: ${({ theme, isLast }) => (isLast ? theme.spacing.deca : 0)};
  flex: 1;
`;

export const Control = styled.Pressable`
  width: 100%;
`;

export const Header = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.Pressable<Partial<StyleProps>>`
  position: absolute;
  aspect-ratio: 1;
  left: 0;
`;
