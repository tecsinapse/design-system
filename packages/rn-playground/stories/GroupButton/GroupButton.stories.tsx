import {
  GroupButton,
  GroupButtonOption,
  type GroupButtonValue,
} from '@tecsinapse/cortex-native';
import React, { useState } from 'react';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof GroupButton> = {
  title: 'GroupButton',
  component: GroupButton,
};

export default StoryMeta;

const options: GroupButtonValue<string>[] = [
  {
    value: 'Sim',
    options: {
      activeBackgroundColor: 'success',
      activeBorderColor: 'success',
    },
  },
  { value: 'Não' },
  {
    value: 'Inválido',
    options: {
      activeBackgroundColor: 'error',
      activeBorderColor: 'error',
    },
  },
];

export const Base = () => {
  const [active, setActive] = useState<string>(options[0].value);
  return (
    <GroupButton
      value={active}
      options={options}
      renderKey={option => option}
      renderOption={(option, active) => (
        <GroupButtonOption active={active} description={option} />
      )}
      onChange={setActive}
    />
  );
};
