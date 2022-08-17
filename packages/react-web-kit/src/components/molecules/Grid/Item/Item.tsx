import React from 'react';
import { IGridItem, useTheme, Breakpoints } from '@tecsinapse/react-core';
import { useBreakpoints } from '@tecsinapse/react-web-kit';
import { getPadding, getSpan } from './functions';

export type Span = Pick<Breakpoints, 'sm'> & Partial<Omit<Breakpoints, 'sm'>>;

export interface IGridItemWeb
  extends Omit<IGridItem, 'span'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** At least sm should exist */
  span: number | Span;
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
    flexBasis: `${100 / (columns / span)}%`,
    paddingTop: getPadding('top', _spacing, spacing),
    paddingBottom: getPadding('bottom', _spacing, spacing),
    paddingRight: getPadding('right', _spacing, spacing),
    paddingLeft: getPadding('left', _spacing, spacing),
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
