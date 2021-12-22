import React from 'react';
import { View, ViewProps } from 'react-native';
import { GridItem } from './Item';
import { SpacingType } from '@tecsinapse/react-core';

export interface IGrid extends ViewProps {
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
  spacing?: SpacingType;
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
      <View
        style={[
          style,
          {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
        ]}
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
      </View>
    );
  }

  return (
    <View
      style={[
        style,
        {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
      ]}
      {...rest}
    >
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          ...child?.props,
          columns,
          spacing: child?.props.spacing ?? spacing,
        });
      })}
    </View>
  );
};

export default Grid;
