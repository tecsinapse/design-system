import * as React from 'react';
import { Dimensions, ScrollView, ScrollViewProps, View } from 'react-native';
import { SpacingType, ThemeProp } from '@tecsinapse/react-core';
import { useTheme } from '@emotion/react';

export interface SnappingSliderProps
  extends Omit<ScrollViewProps, 'horizontal' | 'snapToOffsets'> {
  /**
   * Amount in screen elements.
   * Should never be lower than scrollAmount, otherwise some elements will be skipped.
   */
  showAmount: number;

  /**
   * Amount of items to scroll within a single swipe.
   * Should never be greater than showAmount, otherwise some elements will be skipped.
   */
  scrollAmount: number;

  /**
   * Spacing between elements.
   * Must be one of [nano, micro, mili, centi, deca, kilo, mega, giga, tera, peta, hexa]
   */
  spacing?: SpacingType;
}

const SnappingSlider: React.FC<SnappingSliderProps> = ({
  children,
  showAmount,
  scrollAmount,
  spacing,
  ...rest
}) => {
  const theme = useTheme() as ThemeProp;

  const childCount = React.Children.count(children);
  const screenWidth = Dimensions.get('window').width;
  const totalSlideWidth = Math.round(screenWidth / showAmount);
  const horizontalPadding = spacing
    ? parseInt(theme.spacing[spacing].replace(/\D/g, '')) / 2
    : 0;

  const snapToOffsets = [
    ...Array(Math.ceil(childCount / scrollAmount)).keys(),
  ].map(index => {
    const offset = totalSlideWidth * scrollAmount * index;
    const padCompensation = horizontalPadding * Math.sign(index);
    return offset + padCompensation;
  });

  return (
    <ScrollView
      horizontal
      snapToOffsets={snapToOffsets}
      snapToStart
      snapToEnd
      showsHorizontalScrollIndicator={false}
      {...rest}
    >
      {React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === childCount - 1;

        return (
          <View
            style={{
              width: totalSlideWidth,
              paddingHorizontal: horizontalPadding,
              paddingLeft: isFirst ? 0 : horizontalPadding,
              paddingRight: isLast ? 0 : horizontalPadding,
            }}
          >
            {child}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SnappingSlider;
