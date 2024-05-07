import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { buttonSelect, dropdown, option as styleOption } from '../src';

export default {
  title: 'Cortex/Select',
  component: <div />,
};

const Template: StoryFn = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
  ];
  return (
    <div className="w-full relative">
      <button
        className={buttonSelect()}
        onClick={() => setOpen(prevState => !prevState)}
      >
        <p>{value ? value : 'Select one'}</p>
        <div>\/</div>
      </button>
      <ul role={'select'} className={dropdown({ open, className: 'absolute' })}>
        {options.map(option => (
          <li
            role={'option'}
            value={option}
            onClick={() => {
              setValue(option);
              setOpen(false);
            }}
            className={styleOption()}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
