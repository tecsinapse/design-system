import styled from '@emotion/native';
import { FC } from 'react';
import { StyleProps } from '../../../types/defaults';
import { DateTimeSelectorProps } from '../DateTimeSelector';

export const getStyledDateTimeSelector = (
  component: FC<DateTimeSelectorProps>
) => {
  return styled(component)<Partial<StyleProps>>`
    padding: ${({ theme }) => theme.spacing.deca};
  `;
};
