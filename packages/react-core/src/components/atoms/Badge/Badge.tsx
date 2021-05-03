import React from 'react';
import { View } from 'react-native';
import { Text, borderRadius, ThemeProp } from '@tecsinapse/react-core';
import styled from '@emotion/native';

export interface BadgeProps {
  variant?: string;
  theme?: ThemeProp;
}

const Badge = (props: BadgeProps): JSX.Element => {
  const { variant } = props;
  return (
    <BadgeStyle variant={variant}>
      <TextStyle>Badge</TextStyle>
    </BadgeStyle>
  );
};

export default Badge;

/// implementar variants
const BadgeStyle = styled(View)`
  border-radius: ${borderRadius.pill};
  background-color: ${({ theme, variant }) => theme[variant].main};
  width: 70px;
  align-items: center;
`;
const TextStyle = styled(Text)`
  color: ${({ theme }) => theme.success.contrast};
  font-weight: bold;
`;
