import styled from '@emotion/native';
import { PressableSurface, StyleProps } from '@tecsinapse/react-core';

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
  aspect-ratio: 1;
`;

export const Header = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.mili};
  margin-bottom: ${({ theme }) => theme.spacing.mili};
`;
