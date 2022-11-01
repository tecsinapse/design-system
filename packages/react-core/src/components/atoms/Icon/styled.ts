import { ComponentType } from 'react';
import { IconRNVIProps } from './types';
import { IconSizeType, StyleProps } from '@tecsinapse/react-core';
import styled from '@emotion/native';

export const getStyledIcon = (
  Component: ComponentType<IconRNVIProps>,
  size: IconSizeType
) => styled(Component)<Partial<StyleProps>>`
  font-size: ${({ theme }: StyleProps) => theme?.iconSize[size]};
  text-align: center;
`;
