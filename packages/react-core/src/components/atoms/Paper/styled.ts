import { Animated } from 'react-native';
import styled, { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { PaperProps } from './Paper';
import { baseStyles, elevatedStyles } from '../shared/PaperAndCard';

export const StyledPaper = styled(Animated.View)<
  PaperProps & Partial<StyleProps>
>(
  props => css`
    ${baseStyles(props)}
    ${elevatedStyles(props)}
  `
);
