import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Text, TextProps } from '../../../atoms/Text';
import { RFValue } from '../../../../utils';
import { useTheme } from '../../../../hooks';
import MemoizedYearCard from './MemoizedYearCard';

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
    [yearsToShow, firstYear]
  );

  const initialIndex = React.useMemo(() => {
    const index = (currentYear % firstYear) / numColumns - 2;
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

export default React.memo(SelectYear);
