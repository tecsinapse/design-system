import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { YearCard } from '../styled';
import { Text, TextProps } from '../../../atoms/Text';
import { RFValue, useTheme } from '@tecsinapse/react-core';

export interface SelectYearProps {
  currentYear: number;
  onSelectYear: (year: number) => void;
  TextComponent?: React.FC<TextProps>;
  yearsToShow?: number;
  firstYear?: number;
  numColumns?: number;
}

const SelectYear = ({
  currentYear,
  onSelectYear,
  TextComponent = Text,
  yearsToShow = 100,
  firstYear = 1950,
  numColumns = 4,
}: SelectYearProps) => {
  const theme = useTheme();

  const years = React.useMemo(
    () => Array.from({ length: yearsToShow }, (_, i) => i + firstYear),
    []
  );

  const initialIndex = React.useMemo(() => {
    const index = (currentYear % firstYear) / numColumns - 3;
    return index < 0 ? 0 : index;
  }, [currentYear, firstYear, numColumns]);

  const yearCardHeight =
    RFValue(Number(theme.typography.base.fontSize.slice(0, -2))) +
    2 * RFValue(Number(theme.spacing.deca.slice(0, -2)));

  const yearCardsBuilder = React.useCallback(
    (item: ListRenderItemInfo<number>) => (
      <MemoizedYearCard
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
      contentContainerStyle={{
        alignItems: 'center',
      }}
      numColumns={numColumns}
      initialScrollIndex={initialIndex}
      getItemLayout={(_, index) => ({
        length: yearCardHeight,
        offset: yearCardHeight * index,
        index,
      })}
      fadingEdgeLength={200}
    />
  );
};

interface MemoizedYearCardProps {
  year: number;
  isSelected: boolean;
  onPress: () => void;
  TextComponent: React.FC<TextProps>;
}

export const MemoizedYearCard = ({
  year,
  isSelected,
  onPress,
  TextComponent,
}: MemoizedYearCardProps): JSX.Element =>
  React.useMemo(
    () => (
      <YearCard
        id={String(year)}
        key={year}
        isSelected={isSelected}
        onPress={onPress}
      >
        <TextComponent
          colorVariant={isSelected ? 'primary' : 'secondary'}
          colorTone={'xdark'}
        >
          {year}
        </TextComponent>
      </YearCard>
    ),
    [year, isSelected]
  );

export default React.memo(SelectYear);
