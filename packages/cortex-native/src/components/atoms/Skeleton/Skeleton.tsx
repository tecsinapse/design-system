import React, { useState } from 'react';
import { LayoutChangeEvent, View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { Wave } from './Wave';
import { Pulse } from './Pulse';
import { ChildrenLayout } from './types';

export type SkeletonRadius = 'nano' | 'micro' | 'mili' | 'centi' | 'deca' | 'pill';

const radiusClass: Record<SkeletonRadius, string> = {
  nano: 'rounded-nano',
  micro: 'rounded-micro',
  mili: 'rounded-mili',
  centi: 'rounded-centi',
  deca: 'rounded-deca',
  pill: 'rounded-pill',
};

export interface SkeletonProps extends ViewProps {
  width?: number;
  height?: number;
  radius?: SkeletonRadius;
  active?: boolean;
  animation?: 'wave' | 'pulse';
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  width,
  height,
  radius,
  active = true,
  animation = 'wave',
  style,
  className,
  testID,
  ...rest
}) => {
  const [childrenLayout, setChildrenLayout] = useState<ChildrenLayout>({
    width: 0,
    height: 0,
    y: 0,
    x: 0,
  });

  if (!width && !height && !children) {
    throw new Error(
      '[Skeleton] You should provide children or specify width and height',
    );
  }

  const getChildrenLayout = (event: LayoutChangeEvent) => {
    setChildrenLayout(event.nativeEvent.layout);
  };

  return (
    <View
      {...rest}
      testID={testID}
      className={cn('overflow-hidden relative', radius && radiusClass[radius], className)}
      style={[
        width ? { width } : null,
        height ? { height } : null,
        style,
      ]}
    >
      {active && animation === 'wave' ? (
        <Wave
          active={active}
          width={width}
          height={height}
          childrenLayout={childrenLayout}
        />
      ) : (
        <></>
      )}

      {active && animation === 'pulse' ? (
        <Pulse
          active={active}
          width={width}
          height={height}
          childrenLayout={childrenLayout}
        />
      ) : (
        <></>
      )}
      <View
        onLayout={event => getChildrenLayout(event)}
        style={{ opacity: active ? 0 : 1 }}
        pointerEvents={active ? 'none' : 'auto'}
      >
        {children}
      </View>
    </View>
  );
};

export default Skeleton;
