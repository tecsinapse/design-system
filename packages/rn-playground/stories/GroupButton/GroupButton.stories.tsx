import {
  GroupButton,
  GroupButtonOption,
  GroupButtonValue,
} from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

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
