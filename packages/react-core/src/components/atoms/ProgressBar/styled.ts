import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { Animated } from 'react-native';

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
  border-right-width: 2px;
  border-color: ${({ theme }) => theme.color.secondary.xlight};
`;

export const Progress = styled(Animated.View)<Partial<StyleProps>>`
  height: 100%;
  border-color: ${({ theme }) => theme.color.secondary.xlight};
`;
