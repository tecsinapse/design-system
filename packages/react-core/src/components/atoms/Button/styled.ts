import styled, { css } from '@emotion/native';
import { TouchableHighlight } from 'react-native';

const variantStyles = (theme, color, variant = 'filled') => {
  if (variant === 'outlined') {
    return css`
      border-color: ${theme.colors[color].medium};
    `;
  }
  if (variant === 'text') {
    return css`
      background-color: unset;
    `;
  }

  return css`
    background-color: ${theme.colors[color].medium};
  `;
};

export const StyledButton = styled(TouchableHighlight)`
  padding: 10px;
  border-radius: 4px;
  ${({ color, variant, theme }) => variantStyles(theme, color, variant)}
  ${({ style }) => style}
`;
