import styled from '@emotion/native';
import { Text } from '../../atoms/Text';
import { StyleProps } from '@tecsinapse/react-core';
import { Selector } from './Selector';

export const Title = styled(Text)``;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SelectorRoot = styled.View<Partial<StyleProps>>`
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.secondary.light};
  border-radius: ${({ theme }) => theme.borderRadius.micro};
`;

export const SelectorValue = styled.View`
  align-items: center;
`;

export const StyledSelector = styled(Selector)`
  flex: 1;
`;

export const Control = styled.Pressable`
  width: 100%;
  background-color: red;
`;
