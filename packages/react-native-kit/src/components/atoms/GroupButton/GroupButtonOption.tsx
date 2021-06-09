import {
  GroupButtonOption as CoreGroupButtonOption,
  GroupButtonOptionProps,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../Text';

const GroupButtonOption = <T extends any>(props: GroupButtonOptionProps<T>) => {
  return <CoreGroupButtonOption {...props} TextElement={Text} />;
};

export default GroupButtonOption;
