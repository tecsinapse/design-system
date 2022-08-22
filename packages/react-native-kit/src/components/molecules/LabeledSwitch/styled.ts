import styled, { css } from '@emotion/native';
import { LabelPositionOptions, StyleProps } from '@tecsinapse/react-core';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';

export const StyledView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledLabel = styled(Text)<
  Partial<StyleProps> & {
    labelPosition: LabelPositionOptions;
  }
>`
  ${({ theme, labelPosition }) => {
    if (labelPosition === 'right')
      return css`
        margin-left: ${theme?.spacing.centi};
      `;
    else if (labelPosition === 'left')
      return css`
        margin-right: ${theme?.spacing.centi};
      `;
  }}
`;
