import React from 'react';
import { StoryFn } from '@storybook/react';
import { snackbar } from '../../cortex-core/src/components/snackbar/snackbar';

export default {
  title: 'Lab/Snackbar',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className={snackbar({ intent: 'success' })}>Mensagem Snackbar</div>
  );
};

export const Base = Template.bind({});

Base.args = {};
