import React from 'react';
import { SpacingType } from '@tecsinapse/react-core';

export interface IGrid {
  children: JSX.Element[];
  /** Layout should represent the multiplier of columns to fill the rows properly.
   * Example:
   * const layout = [
   *   [6, 6], // Two elements on row
   *   [4, 4, 4], // Three elements on row
   *   [12], // One element on row
   * ];
   * */
  layout?: number[][];
  /** Number of grid columns to be considered (not the number of elements per row) */
  columns?: number;
  spacing?:
    | SpacingType
    | {
        top?: SpacingType;
        right?: SpacingType;
        bottom?: SpacingType;
        left?: SpacingType;
      };
}

export type FlexPositioning = 'flex-start' | 'flex-end' | 'center';
export type FlexAlignBase = FlexPositioning | 'stretch';
export type FlexAlignType = FlexAlignBase | 'baseline';
export type FlexSpacing = 'space-between' | 'space-around';
export type PaddingPosition = 'top' | 'right' | 'bottom' | 'left';

export type GridSpacing =
  | SpacingType
  | {
      top?: SpacingType;
      right?: SpacingType;
      bottom?: SpacingType;
      left?: SpacingType;
    };

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
  spacing?: GridSpacing;
  /** Used to wrap children in a View when its style extrapolates the dimensions*/
  wrapper?: boolean;
}

export * from './functions';
