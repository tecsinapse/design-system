import styled from '@emotion/native';
import {
  Button,
  ButtonProps,
  RFValue,
  StyleProps,
} from '@tecsinapse/react-core';

export const StyledView = styled.View<Partial<StyleProps>>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.deca};
  width: 100%;
`;

export const FloatingButton = styled(Button)<ButtonProps & Partial<StyleProps>>`
  aspect-ratio: 1;
  height: ${() => `${RFValue(49)}px`};
`;

export const Dummy = styled(FloatingButton)`
  background-color: rgba(0, 0, 0, 0);
`;
