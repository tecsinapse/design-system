import React from 'react';
import { Dot } from '../Dot';
import { FontFamily, PieChartData } from '../../types';
import { Container, Text } from './styled';
import { getFontFamilyAndWeight } from '../../styles';

interface LabelProps {
  columns: number;
  data: PieChartData;
  chartConfig?: {
    fontFamily: FontFamily;
  };
}

const Label: React.FC<LabelProps> = ({ columns, data, chartConfig }) => {
  const valueFont = getFontFamilyAndWeight(chartConfig?.fontFamily, 'bold');
  const labelFont = getFontFamilyAndWeight(chartConfig?.fontFamily, 'regular');
  return (
    <Container columns={columns}>
      <Dot color={data.color} />
      <Text font={labelFont} expand>
        {data.label}
      </Text>
      <Text font={valueFont} flexEnd>
        {data.value}
      </Text>
    </Container>
  );
};

export default Label;
