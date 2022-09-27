import styled from '@emotion/styled';
import { default as nativeStyled } from '@emotion/native';
import { StyleProps, Text } from '@tecsinapse/react-core';
import { Td } from '../../../atoms/Table';
import { Button } from '../../../atoms/Button';

export const TdFooterStyled = styled(Td)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi} 0 0 0;
`;

export const FlexContainer = styled('div')`
  display: flex;
  flex-grow: 1;
`;

export const FooterContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
`;

export const FooterContainerStart = styled(FlexContainer)`
  justify-content: flex-start;
`;

export const FooterContainerEnd = styled(FlexContainer)`
  justify-content: flex-end;
`;

export const SelectContainer = styled('div')<Partial<StyleProps>>`
  margin-right: ${({ theme }) => theme.spacing.deca};
`;

export const NavigationButton = nativeStyled(Button)<Partial<StyleProps>>`    
    border-radius: ${({ theme }) => theme.borderRadius.mili};
    height: 44px;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.centi};
    width: 44px;  
`;

// Se o botão estiver ativo, renderizar outlined, caso contrario o botão é text
export const PageButton = nativeStyled(NavigationButton)<Partial<StyleProps>>`
    padding-right: ${({ theme }) => theme.spacing.deca};
    padding-left: ${({ theme }) => theme.spacing.deca};
    border-radius: ${({ theme }) => theme.borderRadius.mili};
    justify-content: center;
    margin-left: ${({ theme }) => theme.spacing.micro};
    margin-right: ${({ theme }) => theme.spacing.micro};
`;

export const PagesContainer = styled('div')<Partial<StyleProps>>`
  margin: 0 20px;
  display: flex;
`;

export const HoveredText = styled('div')<Partial<StyleProps>>`
  user-select: none;
  &:hover * {
    color: ${({ theme }) => theme.font.color.light};
  }
`;

export const TextPagination = nativeStyled(Text)<Partial<StyleProps>>`
  padding-right: ${({ theme }) => theme.spacing.deca};
  padding-left: ${({ theme }) => theme.spacing.deca};

`;
