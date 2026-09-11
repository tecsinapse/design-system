import { cn } from '@tecsinapse/cortex-core';
import React from 'react';
import {
  Text as RNText,
  View,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import Dot from './Dot';
import {
  getFontFamilyAndWeight,
  type FontFamily,
  type PieChartData,
} from './utils';
import { LABEL_CONTAINER_CLASS, LABEL_TEXT_CLASS } from './styled';

export interface LabelProps {
  columns: number;
  data: PieChartData;
  chartConfig?: { fontFamily: FontFamily };
}

const LabelContainer = ({
  columns,
  style,
  ...rest
}: ViewProps & { columns: number }) => (
  <View
    className={LABEL_CONTAINER_CLASS}
    style={[{ flexBasis: `${100 / columns - 2}%` }, style]}
    {...rest}
  />
);

interface LabelTextProps {
  font: { fontFamily: string; fontWeight: TextStyle['fontWeight'] };
  expand?: boolean;
  style?: StyleProp<TextStyle>;
}

const LabelText = ({
  font,
  expand = false,
  style,
  className,
  ...rest
}: LabelTextProps & Omit<TextProps, 'style'>) => (
  <RNText
    className={cn(LABEL_TEXT_CLASS, expand && 'flex-1', className)}
    style={[
      { fontFamily: font.fontFamily, fontWeight: font.fontWeight },
      style,
    ]}
    {...rest}
  />
);

const Label: React.FC<LabelProps> = ({ columns, data, chartConfig }) => {
  const valueFont = getFontFamilyAndWeight(chartConfig?.fontFamily, 'bold');
  const labelFont = getFontFamilyAndWeight(chartConfig?.fontFamily, 'regular');
  return (
    <LabelContainer columns={columns}>
      <Dot color={data.color} />
      <LabelText font={labelFont} expand>
        {data.label}
      </LabelText>
      <LabelText font={valueFont}>{data.value}</LabelText>
    </LabelContainer>
  );
};

export default Label;
