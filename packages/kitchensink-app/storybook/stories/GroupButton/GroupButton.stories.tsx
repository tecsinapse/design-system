import { storiesOf } from '@storybook/react-native';
import { GroupButton, GroupButtonValue } from '@tecsinapse/react-core';
import { GroupButtonOption } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('GroupButton', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('GroupButton', () => <Component />);

const options: GroupButtonValue[] = [
  { id: 0, description: 'All' },
  { id: 1, description: 'Today' },
  { id: 2, description: 'Yesterday' },
  { id: 3, description: 'Last week' },
];

const Component = () => {
  const [active, setActive] = useState<GroupButtonValue>(options[0]);
  return (
    <GroupButton
      value={active}
      options={options}
      renderKey={option => option?.id}
      renderOption={(option, active) => (
        <GroupButtonOption active={active} description={option.description} />
      )}
      onChange={setActive}
    />
  );
};
