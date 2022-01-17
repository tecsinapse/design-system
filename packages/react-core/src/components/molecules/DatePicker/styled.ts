import styled, { css } from '@emotion/native';
import { FC } from 'react';
import { StyleProps } from '../../../types/defaults';
import { Icon } from '../../atoms/Icon';
import { disabledInputStyles, InputContainerProps } from '../../atoms/Input';
import { TextProps } from '../../atoms/Text';

export const getStyledTextComponent = (component: FC<TextProps>) => {
  return styled(component)(
    (props: Partial<InputContainerProps> & Partial<StyleProps>) => css`
      line-height: ${props.theme?.typography.h5.lineHeight};
      ${disabledInputStyles(props)}
    `
  );
};

export const CalendarIcon = styled(Icon)<Partial<StyleProps>>`
  padding: ${({ theme }) => theme.spacing.centi};
  color: ${({ theme }) => theme.color.secondary.medium};
`;
