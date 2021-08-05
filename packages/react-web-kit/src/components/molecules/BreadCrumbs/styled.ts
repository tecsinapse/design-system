import styled from '@emotion/styled';

export const StyledContainerBreadCrumbs = styled('div')`
  background-color: white;
  width: 90%;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.mili};
`;

export const StyledText = styled('a')`
  text-decoration: none;
`;

export const StyledContainerItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
