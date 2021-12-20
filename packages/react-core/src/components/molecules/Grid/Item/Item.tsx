import React from 'react';
import { extractNumbersFromString, SpacingType, useTheme } from '@tecsinapse/react-core';

type FlexPositioning = 'flex-start' | 'flex-end' | 'center';
type FlexAlignBase = FlexPositioning | 'stretch';
type FlexAlignType = FlexAlignBase | 'baseline';
type FlexSpacing = 'space-between' | 'space-around';

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
  spacing?: SpacingType;
}

const GridItem = ({
  children,
  span,
  columns = 12,
  loadingComponent,
  loading = false,
  spacing: _spacing,
  ...rest
}: IGridItem) => {
  const { spacing } = useTheme();
  if (!React.Children.only(children)) {
    throw new Error('The number of children in GridItem should be one');
  }
  if (loadingComponent && loading) {
    return loadingComponent;
  }

  return React.cloneElement(children, {
    ...children?.props,
    style: {
      ...children?.props.style,
      ...rest,
      boxSizing: 'border-box',
      flexBasis: `${100 / (columns / span)}%`,
      padding: _spacing
        ? extractNumbersFromString(spacing[_spacing])
        : undefined,
    },
  });
};

export default GridItem;
