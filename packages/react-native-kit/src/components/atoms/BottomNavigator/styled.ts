import styled from '@emotion/native';
import { StyleProps, Button, ButtonProps } from '@tecsinapse/react-core';
import { ViewProps } from 'react-native';

export const StyledView = styled.View<ViewProps & Partial<StyleProps>>`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.spacing.deca};
  padding-bottom: ${({ theme }) => theme.spacing.kilo};
  background-color: white;
`;

export const TabContainer = styled.View<
  { selected: boolean } & ViewProps & Partial<StyleProps>
>`
  padding-top: ${({ theme }) => theme.spacing.deca};
  border-top-width: ${({ selected }) => (selected ? '2px' : 0)};
  border-color: ${({ theme }) => theme.color.primary.medium};
  justify-content: flex-end;
`;

export const StyledButton = styled(Button)<ButtonProps & Partial<StyleProps>>`
  aspect-ratio: 1;
  padding: 0;
`;
