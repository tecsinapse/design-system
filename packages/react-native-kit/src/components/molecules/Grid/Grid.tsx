import React from 'react';
import { View, ViewProps } from 'react-native';
import { GridItem } from './Item';
import { IGrid } from '@tecsinapse/react-core';

export type IGridNative = IGrid & ViewProps;

const Grid = ({
  children,
  columns = 12,
  layout,
  style,
  spacing,
  ...rest
}: IGridNative): JSX.Element => {
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
