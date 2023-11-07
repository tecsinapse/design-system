import styled from '@emotion/native';
import { StyleProps } from '../../../types/defaults';
import { RFValueStr } from '../../../utils';

export const Container = styled.View<Partial<StyleProps>>`
  display: flex;
  height: ${({ theme }) => theme.spacing.mili};
  border-radius: ${({ theme }) => theme.spacing.mili};
  width: 100%;
  flex-direction: row;
  overflow: hidden;
`;

export const Segment = styled.View<Partial<StyleProps>>`
  flex: 1;
  background-color: ${({ theme }) => theme.color.secondary.light};
  border-right-width: ${RFValueStr('2px')};
  border-color: ${({ theme }) => theme.color.secondary.xlight};
`;

export const Progress = styled.View<Partial<StyleProps>>`
  height: 100%;
  border-color: ${({ theme }) => theme.color.secondary.xlight};
`;
