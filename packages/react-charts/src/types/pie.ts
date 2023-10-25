export type PieChartData = {
  value: number;
  label: string;
  featured?: boolean;
  color: string;
  onPress?: (value: number, label?: string) => void;
};
