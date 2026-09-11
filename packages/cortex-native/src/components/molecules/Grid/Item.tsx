import React from 'react';
import { DimensionValue, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import {
  FlexAlignType,
  FlexSpacing,
  FlexPositioning,
  GridSpacing,
  getGridItemColumSpan,
  getGridItemPadding,
} from './functions';

export interface IGridItem {
  children: React.ReactElement;
  span: number;
  columns?: number;
  loading?: boolean;
  loadingComponent?: React.ReactElement;
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  justifyContent?: FlexPositioning | FlexSpacing | 'space-evenly';
  spacing?: GridSpacing;
  wrapper?: boolean;
  style?: StyleProp<ViewStyle>;
}

export type IGridItemNative = IGridItem &
  Omit<ViewProps, 'children'> & {
    flexBasis?: DimensionValue;
  };

const GridItem = ({
  children,
  span,
  columns = 12,
  loadingComponent,
  loading = false,
  spacing: _spacing,
  wrapper = false,
  alignContent,
  alignItems,
  alignSelf,
  flex,
  flexDirection,
  flexGrow,
  flexShrink,
  justifyContent,
  flexBasis,
  style,
  className,
  testID,
  ...rest
}: IGridItemNative): React.ReactElement => {
  if (!React.Children.only(children)) {
    throw new Error('The number of children in GridItem should be one');
  }
  if (loadingComponent && loading) {
    return loadingComponent;
  }

  const _style = {
    alignContent,
    alignItems,
    alignSelf,
    flex,
    flexDirection,
    flexGrow,
    flexShrink,
    justifyContent,
    flexBasis: flexBasis ?? `${getGridItemColumSpan(columns, span)}%`,
    paddingTop: getGridItemPadding('top', _spacing),
    paddingBottom: getGridItemPadding('bottom', _spacing),
    paddingRight: getGridItemPadding('right', _spacing),
    paddingLeft: getGridItemPadding('left', _spacing),
  };

  let clone: React.ReactElement | undefined = undefined;
  if (React.isValidElement(children)) {
    const childEl = children as React.ReactElement & {
      props?: { style?: StyleProp<ViewStyle>; className?: string; testID?: string };
    };
    clone = React.cloneElement(childEl, {
      ...childEl.props,
      style: wrapper
        ? childEl.props?.style
        : { ..._style, ...childEl.props?.style },
      ...(!wrapper && {
        testID: testID ?? childEl.props?.testID,
        className: cn(childEl.props?.className, className),
      }),
    });
  }
  return wrapper ? (
    <View {...rest} testID={testID} style={[style, _style]} className={cn(className)}>
      {clone}
    </View>
  ) : (
    (clone as React.ReactElement)
  );
};

export default GridItem;
