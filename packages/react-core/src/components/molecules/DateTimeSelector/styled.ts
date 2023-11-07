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
