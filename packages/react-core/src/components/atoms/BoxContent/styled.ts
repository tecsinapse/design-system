import styled, { css } from '@emotion/native';
import { StyleProps } from '../../../types/defaults';
import { View } from 'react-native';
import { BoxContentProps } from './BoxContent';

export const elevatedStyles = ({ theme }: Partial<StyleProps>) => [
  css({
    shadowColor: theme?.miscellaneous.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
];

const topStyles = ({ theme, variant }: Partial<BoxContentProps> & StyleProps) =>
  variant === 'top' &&
  css`
    border-bottom-left-radius: ${theme.borderRadius.deca};
    border-bottom-right-radius: ${theme.borderRadius.deca};
  `;

const bottomStyles = ({
  theme,
  variant,
}: Partial<BoxContentProps> & StyleProps) =>
  variant === 'bottom' &&
  css`
    border-top-left-radius: ${theme.borderRadius.deca};
    border-top-right-radius: ${theme.borderRadius.deca};
  `;

const leftStyles = ({
  theme,
  variant,
}: Partial<BoxContentProps> & StyleProps) =>
  variant === 'left' &&
  css`
    border-top-right-radius: ${theme.borderRadius.deca};
    border-bottom-right-radius: ${theme.borderRadius.deca};
  `;

const rightStyles = ({
  theme,
  variant,
}: Partial<BoxContentProps> & StyleProps) =>
  variant === 'right' &&
  css`
    border-top-left-radius: ${theme.borderRadius.deca};
    border-bottom-left-radius: ${theme.borderRadius.deca};
  `;

const StyledBoxContentBase = styled(View)<Partial<StyleProps>>`
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  min-height: ${({ theme }) => theme.spacing.kilo};
  overflow: hidden;
`;

export const StyledBoxContent = styled(StyledBoxContentBase)(
  props => css`
    ${elevatedStyles(props)}
    ${topStyles(props)}
  ${bottomStyles(props)}
  ${leftStyles(props)}
  ${rightStyles(props)}
  `
);
