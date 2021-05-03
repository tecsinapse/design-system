import styled from '@emotion/native';
import { Paper, spacings, Text, typography } from '@tecsinapse/react-core';

const CardStyle = styled(Paper)`
  width: 400px;
  min-height: 120px;
  max-width: 90vw;
  max-height: 90vh;
  margin-bottom: 1rem;
  padding-top: ${spacings.centi};
  padding-left: ${spacings.deca};
`;

export const TextTitle = styled(Text)`
  ${typography.headings.h1};
  color: black;
`;

export const TextInfo = styled(Text)`
  padding-top: ${spacings.mili};
  padding-left: ${spacings.micro};
  ${typography.text.base};
  color: black;
`;

export default CardStyle;
