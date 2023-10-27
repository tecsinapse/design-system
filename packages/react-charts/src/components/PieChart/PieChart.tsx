import { Text } from 'react-native-svg';
import React from 'react';
import { PieChart as PChart } from 'react-native-svg-charts';
import { Label } from '../Label';
import { FontFamily, PieChartData, SvgTextType } from '../../types';
import { getCallback, getFeatured, getTextStyles } from './functions';
import { Container, LabelsContainer } from './styled';

export interface PieChartProps {
  data: PieChartData[];
  /** Chart width/height (square view, in px) */
  dimension?: number;
  /** Chart pie area radius (in px) */
  radius?: number;
  label?: string;
  /** You should specify at least fontFamily */
  labelProps?: SvgTextType;
  sub?: string;
  /** You should specify at least fontFamily */
  subProps?: SvgTextType;
  /** Number of label columns */
  columns?: number;
  /** This should be used if you have a custom font configuration */
  chartConfig?: {
    fontFamily: FontFamily;
  };
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  dimension = 200,
  radius = 32,
  label,
  sub,
  labelProps,
  subProps,
  columns = 1,
  chartConfig,
}) => {
  /** 90 is to compensate the outerRadius featured option */
  const inner = 90 - (radius * 100) / (dimension / 2);

  const chart = data.map((item, index) => ({
    value: item.value,
    svg: {
      fill: item.color,
      ...getCallback(item.value, item.label, item.onPress),
    },
    ...getFeatured(item.featured ?? false),
    key: `pie-${index}`,
  }));

  const sum = data.reduce((prev, curr) => prev + curr.value, 0);

  const {
    textAnchor,
    alignmentBaseline,
    fontSize = 32,
    fontWeight,
    fontFamily,
    fill,
    y = sub ? -5 : undefined,
  } = getTextStyles(labelProps, 'bold', chartConfig);

  const {
    textAnchor: textAnchorSub,
    alignmentBaseline: alignmentBaselineSub,
    fontSize: fontSizeSub = 14,
    fontWeight: fontWeightSub,
    fontFamily: fontFamilySub,
    fill: fillSub,
    y: ySub = 16,
  } = getTextStyles(subProps, 'bold', chartConfig);

  return (
    <Container>
      <PChart
        style={{ width: dimension, height: dimension, flex: 1 }}
        data={chart}
        padAngle={0}
        innerRadius={`${inner}%`}
      >
        <Text
          textAnchor={textAnchor}
          alignmentBaseline={alignmentBaseline}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          fill={fill}
          y={y}
        >
          {label ?? sum}
        </Text>
        {sub && (
          <Text
            textAnchor={textAnchorSub}
            alignmentBaseline={alignmentBaselineSub}
            fontSize={fontSizeSub}
            fontWeight={fontWeightSub}
            fontFamily={fontFamilySub}
            fill={fillSub}
            y={ySub}
          >
            {sub}
          </Text>
        )}
      </PChart>
      <LabelsContainer>
        {data.map(item => (
          <Label
            data={item}
            columns={columns}
            key={item.label}
            chartConfig={chartConfig}
          />
        ))}
      </LabelsContainer>
    </Container>
  );
};

export default PieChart;
