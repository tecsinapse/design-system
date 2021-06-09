import styled, { css } from '@emotion/native';
import { CardProps, StyleProps } from '@tecsinapse/react-core';
import { baseStyles, elevatedStyles } from '../shared/PaperAndCard';
import { PressableSurface } from '../PressableSurface';

export const StyledCard = styled(PressableSurface)<
  CardProps & Partial<StyleProps>
>(
  props => css`
    ${baseStyles(props)}
    ${elevatedStyles(props)}
  `
);
