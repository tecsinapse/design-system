import React from 'react';
import { GridItem } from './Item';
import { SpacingType } from '@tecsinapse/react-core';

export interface IGrid extends React.HTMLAttributes<HTMLDivElement> {
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

const Grid = ({
  children,
  columns = 12,
  layout,
  style,
  spacing,
  ...rest
}: IGrid) => {
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
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          ...child?.props,
          columns,
          spacing: child?.props.spacing ?? spacing,
        });
      })}
    </div>
  );
};

export default Grid;
