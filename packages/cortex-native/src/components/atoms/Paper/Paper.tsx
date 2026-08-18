import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';

export interface PaperProps {
  /** Creates elevation shadow */
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}

const Paper = ({
  children,
  elevated = false,
  style,
  testID,
}: PaperProps): React.ReactElement => (
  <View
    testID={testID}
    className={clsx('bg-surface-overlay rounded-mili', elevated && 'shadow-default')}
    style={style}
  >
    {children}
  </View>
);

export default Paper;
