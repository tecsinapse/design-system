import { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseStyles = ({ theme }: StyleProps): any => css`
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.miscellaneous.surfaceColor};
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const elevatedStyles = ({
  theme,
  elevated = false,
}: { elevated?: boolean } & StyleProps): any =>
  elevated && [
    css({
      shadowColor: theme.miscellaneous.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    }),
  ];
/* eslint-enable @typescript-eslint/no-explicit-any */
