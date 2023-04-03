import { SwitchProps } from '../../atoms/Switch';

export type LabelPositionOptions = 'left' | 'right';

export type LabeledSwitchProps = {
  pressableLabel?: boolean;
  leftLabel?: string;
  rightLabel?: string;
} & (
  | {
      leftLabel: string;
    }
  | {
      rightLabel: string;
    }
) &
  SwitchProps;
