import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';
import { Th, Td } from '../../atoms/Table';

export const TdFooterStyled = styled(Td)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi} 0 0 0;
`;

export const FlexContainer = styled('div')`
  display: flex;
`;

export const FooterContainer = styled(FlexContainer)`
  justify-content: space-between;
`;

export const CheckboxCell = styled(Td)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.mili};
  & * {
    user-select: none;
  }
`;
