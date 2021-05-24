import { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';

export const baseStyles = ({ theme }) => css`
  padding: ${theme.spacing.deca};
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.miscellaneous.surfaceColor};
`;

export const elevatedStyles = ({
  theme,
  elevated = false,
}: { elevated?: boolean } & StyleProps) =>
  elevated && [
    css({
      shadowColor: theme.miscellaneous.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.4,
      elevation: 2,
    }),
  ];
