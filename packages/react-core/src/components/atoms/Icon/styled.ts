import { ComponentType } from 'react';
import { IconRNVIProps } from './types';
import { IconSizeType, StyleProps } from '../../../types/defaults';
import styled from '@emotion/native';

export const getStyledIcon = (
  Component: ComponentType<IconRNVIProps>,
  size: IconSizeType
) => styled(Component)<Partial<StyleProps>>`
  font-size: ${({ theme }: StyleProps) => theme?.iconSize[size]};
  text-align: center;
`;
