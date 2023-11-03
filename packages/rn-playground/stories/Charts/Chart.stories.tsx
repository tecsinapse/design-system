import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { PieChart, PieChartData } from '@tecsinapse/react-charts';

const PieChartMeta: ComponentMeta<typeof PieChart> = {
  title: 'Charts',
  component: PieChart,
};

export default PieChartMeta;

type PieChartStory = ComponentStory<typeof PieChart>;

const data = [
  { value: 10, label: 'Fora do prazo' },
  { value: 13, label: 'Dentro do prazo' },
];
const colors = ['#FCCB83', '#F89907'];
const pieData: PieChartData[] = data.map((item, index) => ({
  value: item.value,
  label: item.label,
  color: colors[index],
  onPress: (value, label) => console.log(value, label),
  //featured: index === 0,
}));

export const Pie: PieChartStory = args => {
  const fonts = {
    regular: 'Lato-Regular',
    bold: 'Lato-Bold',
    black: 'Lato-Black',
  };

  return (
    <PieChart
      data={pieData}
      sub={'People'}
      chartConfig={{ fontFamily: fonts }}
    />
  );
};
