import React from 'react';
import { View, ViewProps } from 'react-native';
import {
  IGridItem,
  useTheme,
  getGridItemColumSpan,
  getGridItemPadding,
} from '@tecsinapse/react-core';

export type IGridItemNative = IGridItem &
  ViewProps & {
    /** Only specify this property if the GridItem will be 'dynamic', adjusting itself to content. Use this with `wrapper` for better result. */
    flexBasis?: string | 'auto';
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
  ...rest
}: IGridItemNative): JSX.Element => {
  const { spacing } = useTheme();
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
    boxSizing: 'border-box',
    flexBasis: flexBasis ?? `${getGridItemColumSpan(columns, span)}%`,
    paddingTop: getGridItemPadding('top', _spacing, spacing),
    paddingBottom: getGridItemPadding('bottom', _spacing, spacing),
    paddingRight: getGridItemPadding('right', _spacing, spacing),
    paddingLeft: getGridItemPadding('left', _spacing, spacing),
  };

  const clone = React.cloneElement(children, {
    ...children?.props,
    style: wrapper
      ? children?.props.style
      : { ..._style, ...children?.props.style },
  });

  return wrapper ? (
    <View {...rest} style={[style, _style]}>
      {clone}
    </View>
  ) : (
    clone
  );
};

export default GridItem;
