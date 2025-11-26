import {
  GroupButtonOption as CoreGroupButtonOption,
  GroupButtonOptionProps,
} from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../Text';

const GroupButtonOption = (props: GroupButtonOptionProps): React.ReactElement => {
  return <CoreGroupButtonOption {...props} TextComponent={Text} />;
};

export default GroupButtonOption;
