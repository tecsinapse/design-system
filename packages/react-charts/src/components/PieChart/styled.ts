import styled from '@emotion/native';
import { View } from 'react-native';

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const LabelsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
