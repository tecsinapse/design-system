import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useCSSVariable } from 'uniwind';
import Label from './Label';
import {
  buildPieSlices,
  chartColorVar,
  getTextStyles,
  type BuiltPieSlice,
  type FontFamily,
  type PieChartData,
  type SvgTextType,
} from './utils';
import {
  CONTAINER_CLASS,
  G,
  LABELS_CONTAINER_CLASS,
  Path,
  Svg,
  SvgText,
} from './styled';

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

const Container = (props: ViewProps) => (
  <View className={CONTAINER_CLASS} {...props} />
);

const LabelsContainer = (props: ViewProps) => (
  <View className={LABELS_CONTAINER_CLASS} {...props} />
);

interface SliceProps {
  slice: BuiltPieSlice;
}

const Slice = ({ slice }: SliceProps) => {
  const fill = useCSSVariable(chartColorVar(slice.item.color)) as
    | string
    | undefined;
  return (
    <G>
      <Path
        d={slice.d}
        fill={fill}
        onPress={
          slice.item.onPress
            ? () => slice.item.onPress?.(slice.item.value, slice.item.label)
            : undefined
        }
      />
    </G>
  );
};

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
  const slices = buildPieSlices(data, radius, dimension);

  const {
    textAnchor,
    alignmentBaseline,
    fontSize = 32,
    fontWeight,
    fontFamily,
    fill,
    y = sub ? -5 : undefined,
  } = getTextStyles(labelProps, 'bold', chartConfig);
  const labelFill = useCSSVariable(fill) as string | undefined;

  const {
    textAnchor: textAnchorSub,
    alignmentBaseline: alignmentBaselineSub,
    fontSize: fontSizeSub = 14,
    fontWeight: fontWeightSub,
    fontFamily: fontFamilySub,
    fill: fillSub,
    y: ySub = 16,
  } = getTextStyles(subProps, 'bold', chartConfig);
  const subFill = useCSSVariable(fillSub) as string | undefined;

  const sum = data.reduce((prev, curr) => prev + curr.value, 0);

  return (
    <Container>
      <Svg width={dimension} height={dimension}>
        <G x={dimension / 2} y={dimension / 2}>
          {slices.map((slice, index) => (
            <Slice key={`pie-${index}`} slice={slice} />
          ))}
          <SvgText
            textAnchor={textAnchor}
            alignmentBaseline={alignmentBaseline}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            fill={labelFill}
            y={y}
          >
            {label ?? sum}
          </SvgText>
          {sub && (
            <SvgText
              textAnchor={textAnchorSub}
              alignmentBaseline={alignmentBaselineSub}
              fontSize={fontSizeSub}
              fontWeight={fontWeightSub}
              fontFamily={fontFamilySub}
              fill={subFill}
              y={ySub}
            >
              {sub}
            </SvgText>
          )}
        </G>
      </Svg>
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