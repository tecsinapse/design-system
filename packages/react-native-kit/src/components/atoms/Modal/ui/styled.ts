import styled from '@emotion/native';
import { RFValueStr, StyleProps } from '@tecsinapse/react-core';
import { Animated } from 'react-native';

export const StyledPressableBackDrop = styled.Pressable<Partial<StyleProps>>`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const BackDropView = styled(Animated.View)<Partial<StyleProps>>`
  justify-content: flex-end;
  flex: 1;
`;

export const CloseBar = styled.View<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.color.secondary.light};
  border-radius: ${RFValueStr('10px')};
  margin: ${`${RFValueStr('5px')} auto`};
  width: ${RFValueStr('42px')};
  height: ${RFValueStr('5px')};
`;
