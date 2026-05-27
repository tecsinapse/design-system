import styled from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';
import { View } from 'react-native';
import Header from '../../atoms/Header/Header';

export const Root = styled(View)<Partial<StyleProps>>`
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
`;

export const CompactTitleHeader = styled(Header)<Partial<StyleProps>>`
  padding-top: ${({ theme }) => theme.spacing.deca};
  padding-bottom: ${({ theme }) => theme.spacing.mili};
  padding-left: ${({ theme }) => theme.spacing.deca};
  padding-right: ${({ theme }) => theme.spacing.deca};
`;

export const CompactSearchBarContainer = styled(View)<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.deca};
  padding-right: ${({ theme }) => theme.spacing.deca};
  padding-top: ${({ theme }) => theme.spacing.mili};
  padding-bottom: ${({ theme }) => theme.spacing.centi};
`;
