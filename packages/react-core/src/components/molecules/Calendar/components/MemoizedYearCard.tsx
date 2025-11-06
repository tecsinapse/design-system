import React from 'react';
import { YearCard } from '../styled';
import { TextProps } from '../../../atoms/Text';

interface MemoizedYearCardProps {
  year: number;
  isSelected: boolean;
  onPress: () => void;
  TextComponent: React.FC<TextProps>;
}

const MemoizedYearCard = React.memo(
  ({
    year,
    isSelected,
    onPress,
    TextComponent,
  }: MemoizedYearCardProps): React.ReactElement => (
    <YearCard
      id={String(year)}
      key={year}
      isSelected={isSelected}
      onPress={onPress}
    >
      <TextComponent
        colorVariant={isSelected ? 'primary' : 'secondary'}
        colorTone={'xdark'}
        typography={'sub'}
      >
        {year}
      </TextComponent>
    </YearCard>
  )
);

export default MemoizedYearCard;
