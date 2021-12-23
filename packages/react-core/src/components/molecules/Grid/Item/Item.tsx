import React from 'react';
import {
  extractNumbersFromString,
  SpacingType,
  useTheme,
} from '@tecsinapse/react-core';
import { View } from 'react-native';

type FlexPositioning = 'flex-start' | 'flex-end' | 'center';
type FlexAlignBase = FlexPositioning | 'stretch';
type FlexAlignType = FlexAlignBase | 'baseline';
type FlexSpacing = 'space-between' | 'space-around';

type PaddingPosition = 'top' | 'right' | 'bottom' | 'left';

export interface IGridItem {
  children: React.ReactElement;
  /** Number of columns to fill */
  span: number;
  /** You don't have to give this property since is inherited from Grid */
  columns?: number;
  loading?: boolean;
  /** If your GridItem has a loading state, specify the component here (Skeleton) */
  loadingComponent?: React.ReactElement;
  /** Flex properties below */
  alignContent?: FlexAlignBase | FlexSpacing;
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  justifyContent?: FlexPositioning | FlexSpacing | 'space-evenly';
  /** You don't have to give this property since is inherited from Grid */
  spacing?:
    | SpacingType
    | {
        top?: SpacingType;
        right?: SpacingType;
        bottom?: SpacingType;
        left?: SpacingType;
      };
  /** Used to wrap children in a View when its style extrapolates the dimensions*/
  wrapper?: boolean;
}

const GridItem = ({
  children,
  span,
  columns = 12,
  loadingComponent,
  loading = false,
  spacing: _spacing,
  wrapper = false,
  ...rest
}: IGridItem) => {
  const { spacing } = useTheme();
  if (!React.Children.only(children)) {
    throw new Error('The number of children in GridItem should be one');
  }
  if (loadingComponent && loading) {
    return loadingComponent;
  }

  const getPadding = (pos: PaddingPosition) => {
    if (_spacing) {
      if (typeof _spacing === 'string')
        return extractNumbersFromString(spacing[_spacing]);
      else if (typeof _spacing === 'object' && _spacing[pos]) {
        return extractNumbersFromString(spacing[_spacing[pos]!]);
      } else return undefined;
    } else return undefined;
  };

  const style = {
    ...rest,
    boxSizing: 'border-box',
    flexBasis: `${100 / (columns / span)}%`,
    paddingTop: getPadding('top'),
    paddingBottom: getPadding('bottom'),
    paddingRight: getPadding('right'),
    paddingLeft: getPadding('left'),
  };

  const clone = React.cloneElement(children, {
    ...children?.props,
    style: wrapper
      ? children?.props.style
      : { ...style, ...children?.props.style },
  });

  return wrapper ? <View style={style}>{clone}</View> : clone;
};

export default GridItem;
