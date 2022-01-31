import styled from '@emotion/styled';
import { StyleProps } from '@tecsinapse/react-core';

export const ThStyled = styled('th')<Partial<StyleProps>>`
  padding: ${({ theme }) => `${theme.spacing.centi} ${theme.spacing.deca}`};
  color: ${({ theme }) => theme.font.color.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.typography.sub.fontSize};
  line-height: ${({ theme }) => theme.typography.sub.lineHeight};
  font-family: ${({ theme }) => theme.font.stack.default};

  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const THeadStyled = styled('thead')<Partial<StyleProps>>`
  & > tr {
    border-radius: unset;
    box-shadow: none;
  }
`;

export const HeaderBackground = styled('hr')<Partial<StyleProps>>`
  margin: -51px -25px 4px -25px;
  height: 42px;
  background-color: ${({ theme }) => theme.color.secondary.xlight};
  border: 0;
`;
