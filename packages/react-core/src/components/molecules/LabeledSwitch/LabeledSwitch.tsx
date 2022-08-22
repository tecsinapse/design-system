import { SwitchProps } from '../../atoms/Switch';

export type LabelPositionOptions = 'left' | 'right';

export interface LabeledSwitchProps extends SwitchProps {
  label: string;
  labelPosition?: LabelPositionOptions;
  pressableLabel?: boolean;
}
