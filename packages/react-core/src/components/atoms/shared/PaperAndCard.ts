import { css } from '@emotion/native';
import { StyleProps } from '@tecsinapse/react-core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseStyles = ({ theme }: StyleProps): any => css`
  border-radius: ${theme.borderRadius.mili};
  background-color: ${theme.miscellaneous.surfaceColor};
  overflow: hidden;
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const elevatedStyles = ({
  theme,
  elevated = false,
}: { elevated?: boolean } & StyleProps): any =>
  elevated && [
    css({
      shadowColor: theme.miscellaneous.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.4,
      elevation: 2,
    }),
  ];
/* eslint-enable @typescript-eslint/no-explicit-any */
