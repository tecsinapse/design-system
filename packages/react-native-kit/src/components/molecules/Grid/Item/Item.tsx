import React from 'react';
import { View } from 'react-native';
import {
  extractNumbersFromString,
  IGridItem,
  PaddingPosition,
  useTheme,
} from '@tecsinapse/react-core';

export type IGridItemNative = IGridItem;

const GridItem = ({
  children,
  span,
  columns = 12,
  loadingComponent,
  loading = false,
  spacing: _spacing,
  wrapper = false,
  ...rest
}: IGridItemNative) => {
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
