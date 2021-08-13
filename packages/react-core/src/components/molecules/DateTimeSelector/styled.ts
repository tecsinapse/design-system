import styled from '@emotion/native';
import { StyleProps } from '../../../types/defaults';
import { PressableSurface } from '../../atoms/PressableSurface';

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
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.secondary.xlight};
  border-radius: ${({ theme }) => theme.borderRadius.mili};
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

export const Control = styled(PressableSurface)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  padding: ${({ theme }) => theme.spacing.micro};
  margin-vertical: ${({ theme }) => theme.spacing.mili};
  margin-horizontal: ${({ theme }) => theme.spacing.mili};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled(PressableSurface)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.mili};
  padding: ${({ theme }) => theme.spacing.micro};
  position: absolute;
  aspect-ratio: 1;
  left: 0;
`;
