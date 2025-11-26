import React from 'react';
import { DimensionValue, View, ViewProps } from 'react-native';
import {
  getGridItemColumSpan,
  getGridItemPadding,
  IGridItem,
  useTheme,
} from '@tecsinapse/react-core';

export type IGridItemNative = IGridItem &
  Omit<ViewProps, 'children'> & {
    /** Only specify this property if the GridItem will be 'dynamic', adjusting itself to content. Use this with `wrapper` for better result. */
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
  ...rest
}: IGridItemNative): React.ReactElement => {
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

  let clone: React.ReactElement | undefined = undefined;
  if (React.isValidElement(children)) {
    const childEl = children as React.ReactElement & { props?: any };
    clone = React.cloneElement(childEl, {
      ...childEl.props,
      style: wrapper
        ? childEl.props?.style
        : { ..._style, ...childEl.props?.style },
    });
  }

  return wrapper ? (
    <View {...rest} style={[style, _style]}>
      {clone}
    </View>
  ) : (
    (clone as React.ReactElement)
  );
};

export default GridItem;
