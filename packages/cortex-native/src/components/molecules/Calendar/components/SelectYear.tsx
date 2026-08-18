import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import Text, { TextProps } from '../../../atoms/Text/Text';
import PressableSurface from '../../../atoms/PressableSurface/PressableSurface';

export interface SelectYearProps {
  currentYear: number;
  onSelectYear: (year: number) => void;
  TextComponent?: React.FC<TextProps>;
  yearsToShow?: number;
  firstYear?: number;
  numColumns?: number;
}

const YEAR_CARD_HEIGHT = 40;

const SelectYear = ({
  currentYear,
  onSelectYear,
  TextComponent = Text,
  yearsToShow = 100,
  firstYear = 1950,
  numColumns = 4,
}: SelectYearProps) => {
  const years = React.useMemo(
    () => Array.from({ length: yearsToShow }, (_, i) => i + firstYear),
    [yearsToShow, firstYear]
  );

  const initialIndex = React.useMemo(() => {
    const index = (currentYear % firstYear) / numColumns - 2;
    return index < 0 ? 0 : index;
  }, [currentYear, firstYear, numColumns]);

  const yearCardsBuilder = React.useCallback(
    (item: ListRenderItemInfo<number>) => (
      <YearCard
        year={item.item}
        isSelected={currentYear === item.item}
        onPress={() => onSelectYear(item.item)}
        TextComponent={TextComponent}
      />
    ),
    [currentYear, onSelectYear]
  );

  return (
    <FlatList
      data={years}
      renderItem={yearCardsBuilder}
      keyExtractor={item => String(item)}
      contentContainerStyle={{ alignItems: 'center' }}
      numColumns={numColumns}
      initialScrollIndex={initialIndex}
      getItemLayout={(_, index) => ({
        length: YEAR_CARD_HEIGHT,
        offset: YEAR_CARD_HEIGHT * index,
        index,
      })}
      fadingEdgeLength={200}
    />
  );
};

interface YearCardProps {
  year: number;
  isSelected: boolean;
  onPress: () => void;
  TextComponent: React.FC<TextProps>;
}

const YearCard = React.memo(
  ({ year, isSelected, onPress, TextComponent }: YearCardProps) => (
    <PressableSurface
      key={year}
      effect="none"
      onPress={onPress}
      className={
        isSelected
          ? 'bg-primary-light p-mili px-deca rounded-mili m-mili'
          : 'p-mili px-deca rounded-mili m-mili'
      }
    >
      <TextComponent
        colorVariant={isSelected ? 'primary' : 'secondary'}
        colorTone="xdark"
        typography="sub"
      >
        {year}
      </TextComponent>
    </PressableSurface>
  )
);

export default React.memo(SelectYear);
