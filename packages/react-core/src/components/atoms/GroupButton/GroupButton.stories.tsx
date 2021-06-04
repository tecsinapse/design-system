import { Story } from '@storybook/react';
import React from 'react';
import {
  GroupButton,
  GroupButtonOption,
  GroupButtonProps,
  GroupButtonValue,
} from '../GroupButton';

export default {
  title: 'Components/GroupButton',
  component: GroupButton,
};

const options: GroupButtonValue[] = [
  { id: 0, description: 'All' },
  { id: 1, description: 'Today' },
  { id: 2, description: 'Yesterday' },
  { id: 3, description: 'Last week' },
];

const Template: Story<GroupButtonProps<any>> = ({ ...args }) => {
  const [active, setActive] = React.useState<GroupButtonValue>(options[0]);

  return (
    <GroupButton
      value={active}
      options={options}
      renderKey={option => option.id}
      renderOption={(option, active) => (
        <GroupButtonOption active={active} description={option.description} />
      )}
      onChange={setActive}
    />
  );
};

export const Base = Template.bind({});

Base.args = {
  options,
};
