import * as React from 'react';
import { Dimensions, ScrollView, ScrollViewProps, View } from 'react-native';
import { Slide, SlideProps } from './styled';
import { SpacingType, ThemeProp } from '@tecsinapse/react-core';
import { useTheme } from '@emotion/react';

export interface SnappingSliderProps
  extends Omit<ScrollViewProps, 'horizontal'> {
  showAmount: number;
  scrollAmount: number;
  spacing?: SpacingType;
}

const SnappingSlider: React.FC<SnappingSliderProps> & {
  Slide: React.FC<SlideProps>;
} = ({ children, showAmount, scrollAmount, spacing, ...rest }) => {
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
    const offset = (totalSlideWidth * scrollAmount) * index;
    const padCompensation = horizontalPadding * 2 * Math.sign(index);
    return offset + padCompensation;
  });

  if (scrollAmount > showAmount)
    console.warn(
      'scrollAmount should never be greater than showAmount. Otherwise, elements will be skipped.'
    );

  console.log(snapToOffsets);

  return (
    <ScrollView
      style={{ backgroundColor: 'black' }}
      horizontal
      snapToOffsets={snapToOffsets}
      snapToStart
      snapToEnd
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

SnappingSlider.Slide = Slide;

export default SnappingSlider;
