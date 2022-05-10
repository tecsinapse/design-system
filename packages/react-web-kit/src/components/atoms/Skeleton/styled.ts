import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { SkeletonProps } from './Skeleton';

const pulseKf = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;

const waveKf = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const waveAnim = css`
  position: relative;
  overflow: hidden;
  &::after {
    animation: ${waveKf} 1.6s linear 0.5s infinite;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.04),
      transparent
    );
    content: '';
    position: absolute;
    transform: translateX(-100%);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
`;

const pulseAnim = css`
  animation: ${pulseKf} 1.5s ease-in-out 0.5s infinite;
`;

export const Wrapper = styled('div')<Partial<StyleProps & SkeletonProps>>`
  background-color: ${({
    theme,
    animation,
    active,
  }: StyleProps & Partial<SkeletonProps>) =>
    !active
      ? undefined
      : animation === 'pulse'
      ? theme.miscellaneous.bodyColor
      : theme.miscellaneous.surfaceColor};
  width: ${({ width }) => `${width}px` ?? '100%'};
  height: ${({ height }) => `${height}px` ?? 'auto'};
  border-radius: ${({ theme, radius }: StyleProps & Partial<SkeletonProps>) =>
    radius ? theme.borderRadius[radius] : 'unset'};
  ${({ animation, active }) =>
    !active ? undefined : animation === 'pulse' ? pulseAnim : waveAnim};
`;
