import styled from '@emotion/native';
import { View } from 'react-native';
import { StyleProps } from '@tecsinapse/react-core';

export const IconViewStyled = styled(View)<Partial<StyleProps>>`
  padding: ${({ theme }: StyleProps) => theme.spacing.mili};
`;

export const ViewStyled = styled(View)`
  align-items: center;
  flex-direction: row;
`;
