import { Pressable } from 'react-native';
import styled, { css } from '@emotion/native';
import { CardProps, StyleProps } from '@tecsinapse/react-core';
import { baseStyles, elevatedStyles } from '../shared/PaperAndCard';

export const StyledCard = styled(Pressable)<CardProps & Partial<StyleProps>>(
  props => css`
    ${baseStyles(props)}
    ${elevatedStyles(props)}
  `
);
