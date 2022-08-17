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
}: IGridWeb): JSX.Element => {
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
        {React.Children.map(children, (child, index) => (
          <GridItem
            key={`child-${index}`}
            columns={columns}
            span={flatLayout[index]}
            spacing={spacing}
          >
            {child}
          </GridItem>
        ))}
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
        return React.cloneElement(child, {
          ...child?.props,
          columns,
          spacing: child?.props.spacing ?? spacing,
          key: `child-${index}`,
        });
      })}
    </div>
  );
};

export default Grid;
