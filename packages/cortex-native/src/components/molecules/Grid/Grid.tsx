import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import GridItem, { IGridItem } from './Item';
import { GridSpacing } from './functions';

export interface IGrid {
  children: React.ReactNode[];
  layout?: number[][];
  columns?: number;
  spacing?: GridSpacing;
}

export type IGridNative = IGrid & Omit<ViewProps, 'children'> & {
  style?: StyleProp<ViewStyle>;
};

const Grid = ({
  children,
  columns = 12,
  layout,
  style,
  spacing,
  className,
  ...rest
}: IGridNative): React.ReactElement => {
  if (layout) {
    const flatLayout = layout.flat();
    return (
      <View style={[style]} {...rest} className={cn('flex flex-row flex-wrap', className)}>
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
      </View>
    );
  }

  return (
    <View style={[style]} {...rest} className={cn('flex flex-row flex-wrap', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const childEl = child as React.ReactElement & {
            props?: IGridItem & { spacing?: GridSpacing };
          };
          return React.cloneElement(childEl, {
            ...childEl.props,
            columns,
            spacing: childEl.props?.spacing ?? spacing,
            key: `child-${index}`,
          });
        }
        return child;
      })}
    </View>
  );
};

export default Grid;
