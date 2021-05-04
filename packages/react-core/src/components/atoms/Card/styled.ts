import styled from '@emotion/native';
import { Paper } from '../Paper/index';
import { spacings } from '../../styles/definitions';

export const CardStyle = styled(Paper)`
  width: 400px;
  min-height: 120px;
  max-width: 90vw;
  max-height: 90vh;
  margin-bottom: 1rem;
  padding-top: ${spacings.centi};
  padding-left: ${spacings.deca};
  ${({ style }) => style}
`;
