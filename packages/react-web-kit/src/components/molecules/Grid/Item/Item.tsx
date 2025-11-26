import React from 'react';
import {
  IGridItem,
  useTheme,
  Breakpoints,
  getGridItemColumSpan,
  getGridItemPadding,
} from '@tecsinapse/react-core';
import { useBreakpoints } from '../../../../hooks';
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
}: IGridItemWeb): React.ReactElement => {
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
    <div {...rest} style={_style}>
      {clone}
    </div>
  ) : (
    (clone as React.ReactElement)
  );
};

export default GridItem;
