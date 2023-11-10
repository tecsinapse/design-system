import React from 'react';
import { TimeCard } from '../styled';
import { TextProps } from '../../../../index';

interface MemoizedTimeCardProps {
  time: number;
  isSelected: boolean;
  onPress: () => void;
  TextComponent: React.FC<TextProps>;
}

const MemoizedTimeCard = React.memo(
  ({
    time,
    isSelected,
    onPress,
    TextComponent,
  }: MemoizedTimeCardProps): JSX.Element => (
    <TimeCard
      id={String(time)}
      key={time}
      isSelected={isSelected}
      onPress={onPress}
    >
      <TextComponent
        colorVariant={isSelected ? 'primary' : 'secondary'}
        colorTone={'xdark'}
      >
        {time}
      </TextComponent>
    </TimeCard>
  )
);

export default MemoizedTimeCard;
