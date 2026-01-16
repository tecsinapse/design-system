import React from 'react';
import { GridItem } from './Item';
import { IGrid } from '@tecsinapse/react-core';

export type IGridWeb = IGrid &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

const Grid = ({
  children,
  columns = 12,
  layout,
  style,
  spacing,
  ...rest
}: IGridWeb): React.ReactElement => {
  if (layout) {
    const flatLayout = layout.flat();
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        {...rest}
      >
        {React.Children.map(children, (child, index) => {
          const content = React.isValidElement(child) ? child : <>{child}</>;
          return (
            <GridItem
              key={`child-${index}`}
              columns={columns}
              span={flatLayout[index]}
              spacing={spacing}
            >
              {content}
            </GridItem>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      {...rest}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const childEl = child as React.ReactElement & { props?: any };
          return React.cloneElement(childEl, {
            ...childEl.props,
            columns,
            spacing: childEl.props?.spacing ?? spacing,
            key: `child-${index}`,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Grid;
