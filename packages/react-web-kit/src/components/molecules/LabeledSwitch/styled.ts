import { css, default as nativeStyled } from '@emotion/native';
import { default as webStyled } from '@emotion/styled';
import { LabelPositionOptions, StyleProps, Text } from '@tecsinapse/react-core';

export const StyledDiv = webStyled('div')`
  display: flex;
  flex-direction: row;
`;

export const StyledLabel = nativeStyled(Text)<
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
