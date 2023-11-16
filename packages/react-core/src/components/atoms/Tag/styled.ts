import styled, { css } from '@emotion/native';
import { Animated, ViewProps } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  StyleProps,
} from '../../../types/defaults';
import { Icon, IconProps } from '../Icon';
import { TagProps } from './Tag';

const smallVariant = ({ theme, variant }: Partial<TagProps> & StyleProps) =>
  variant === 'small' &&
  css`
    border-radius: ${theme.borderRadius.micro};
    padding: ${theme.spacing.nano} ${theme.spacing.mili};
  `;

const backgroundColorTag = ({
  theme,
  backgroundColorTone,
  backgroundColorVariant,
}: Partial<StyleProps> & {
  backgroundColorTone: ColorType;
  backgroundColorVariant: ColorGradationType;
}) => css`
  background-color: ${theme?.color[backgroundColorTone][
    backgroundColorVariant
  ]};
`;

const defaultVariant = ({ theme, variant }: Partial<TagProps> & StyleProps) =>
  variant === 'default' &&
  css`
    border-radius: ${theme.borderRadius.mili};
    padding: ${theme.spacing.micro} ${theme.spacing.centi};
  `;

const StyledTagContainerBase = styled(Animated.View)<
  Partial<TagProps> & Partial<StyleProps> & ViewProps & { visible: boolean }
>`
  background-color: ${({ theme }) => theme.miscellaneous.bodyColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;

export const StyledTagContainer = styled(StyledTagContainerBase)<
  Partial<StyleProps> & {
    backgroundColorTone: ColorType;
    backgroundColorVariant: ColorGradationType;
  }
>(
  props => css`
    ${smallVariant(props)}
    ${defaultVariant(props)}
    ${backgroundColorTag(props)}
  `
);

export const StyledLeftIcon = styled(Icon)<Partial<StyleProps> & IconProps>`
  margin-right: ${({ theme }) => theme.spacing.micro};
`;

export const StyledCloseIcon = styled(Icon)<Partial<StyleProps> & IconProps>`
  margin-left: ${({ theme }) => theme.spacing.nano};
`;
