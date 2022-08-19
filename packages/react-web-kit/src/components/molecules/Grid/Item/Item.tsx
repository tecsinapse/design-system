import React from 'react';
import {
  IGridItem,
  useTheme,
  Breakpoints,
  getGridItemColumSpan,
  getGridItemPadding,
} from '@tecsinapse/react-core';
import { useBreakpoints } from '@tecsinapse/react-web-kit';
import { getSpan } from './functions';

export type Span = Pick<Breakpoints, 'sm'> & Partial<Omit<Breakpoints, 'sm'>>;

export interface IGridItemWeb
  extends Omit<IGridItem, 'span'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** At least sm should exist */
  span: number | Span;
  /** Only specify this property if the GridItem will be 'dynamic', adjusting itself to content. Use this with `wrapper` for better result. */
  flexBasis?:
    | string
    | 'content'
    | 'auto'
    | 'max-content'
    | 'min-content'
    | 'fit-content';
}

const GridItem = ({
  children,
  span: _span,
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
}: IGridItemWeb): JSX.Element => {
  const { spacing } = useTheme();
  const { sm, md, lg } = useBreakpoints();
  if (!React.Children.only(children)) {
    throw new Error('The number of children in GridItem should be one');
  }
  if (loadingComponent && loading) {
    return loadingComponent;
  }

  const span = typeof _span === 'number' ? _span : getSpan(_span, sm, md, lg);

  const _style: React.CSSProperties = {
    ...style,
    alignContent,
    alignItems,
    alignSelf,
    flexDirection,
    flexGrow,
    flexShrink,
    justifyContent,
    flex,
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
    <div {...rest} style={_style}>
      {clone}
    </div>
  ) : (
    clone
  );
};

export default GridItem;
