import styled from '@emotion/native';
import { Badge, BadgeProps, StyleProps } from '@tecsinapse/react-core';

export const BadgeStyle = styled(Badge)<BadgeProps & Partial<StyleProps>>`
  display: inline-block;
`;
