import styled, { css } from '@emotion/native';
import { View, ViewProps } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { Icon, IconProps } from '../Icon';
import { TagProps } from './Tag';

const smallVariant = ({ theme, variant }: Partial<TagProps> & StyleProps) =>
  variant === 'small' &&
  css`
    border-radius: ${theme.borderRadius.micro};
    padding: ${theme.spacing.nano + ' ' + theme.spacing.mili};
  `;

const defaultVariant = ({ theme, variant }: Partial<TagProps> & StyleProps) =>
  variant === 'default' &&
  css`
    border-radius: ${theme.borderRadius.mili};
    padding: ${theme.spacing.micro + ' ' + theme.spacing.centi};
  `;

const StyledTagContainerBase = styled(View) < Partial<TagProps> & Partial<StyleProps> & ViewProps>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const StyledTagContainer = styled(StyledTagContainerBase)(
  props => css`
    ${smallVariant(props)}
    ${defaultVariant(props)}
  `
);

export const StyledLeftIcon = styled(Icon) <Partial<StyleProps> & IconProps>`
  margin-right: ${({ theme }) => theme.spacing.micro};  
`;

export const StyledCloseIcon = styled(Icon) <Partial<StyleProps> & IconProps>`
  margin-left: ${({ theme }) => theme.spacing.nano};  
`;
