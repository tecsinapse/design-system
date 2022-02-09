import styled from '@emotion/native';
import { RFValueStr, StyleProps } from '@tecsinapse/react-core';
import { SkeletonProps } from './Skeleton';

export const Wrapper = styled.View<Partial<StyleProps & SkeletonProps>>`
  width: ${({ width }) => (width ? `${RFValueStr(`${width}px`)}` : '100%')};
  height: ${({ height }) => (height ? `${RFValueStr(`${height}px`)}` : 'auto')};
  border-radius: ${({ theme, radius }: StyleProps & Partial<SkeletonProps>) =>
    radius ? theme.borderRadius[radius] : 0};
  overflow: hidden;
  position: relative;
`;
