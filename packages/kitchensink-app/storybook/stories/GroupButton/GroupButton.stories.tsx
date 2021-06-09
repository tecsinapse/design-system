import { storiesOf } from '@storybook/react-native';
import { GroupButton, GroupButtonValue } from '@tecsinapse/react-core';
import { GroupButtonOption } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('GroupButton', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('GroupButton', () => <Component />);

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
  

const Component = () => {
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
