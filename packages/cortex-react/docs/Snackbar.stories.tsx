import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, DefaultSnack } from '../src';
import {
  SnackbarProvider,
  useSnackbar,
} from '../src/provider/SnackbarProvider';

export default {
  title: 'Cortex/Snackbar',
  component: DefaultSnack,
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
} as Meta<typeof DefaultSnack>;

export const Default: StoryObj<typeof DefaultSnack> = {
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  render: args => {
    const { snackbar } = useSnackbar();
    return (
      <div className="h-[300px] w-[70vw]">
        <Button
          variants={{ intent: 'primary' }}
          onClick={() => snackbar.show('default', args.text)}
        >
          Show Snack default
        </Button>
      </div>
    );
  },
};

export const Error: StoryObj<typeof DefaultSnack> = {
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  render: args => {
    const { snackbar } = useSnackbar();
    return (
      <div className="h-[300px] w-[70vw]">
        <Button
          variants={{ intent: 'primary' }}
          onClick={() => snackbar.show('error', args.text)}
        >
          Show Snack error
        </Button>
      </div>
    );
  },
};

export const Success: StoryObj<typeof DefaultSnack> = {
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  render: args => {
    const { snackbar } = useSnackbar();
    return (
      <div className="h-[300px] w-[70vw]">
        <Button
          variants={{ intent: 'primary' }}
          onClick={() => snackbar.show('success', args.text)}
        >
          Show Snack success
        </Button>
      </div>
    );
  },
};

export const Warning: StoryObj<typeof DefaultSnack> = {
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  render: args => {
    const { snackbar } = useSnackbar();
    return (
      <div className="h-[300px] w-[70vw]">
        <Button
          variants={{ intent: 'primary' }}
          onClick={() => snackbar.show('warning', args.text)}
        >
          Show Snack warning
        </Button>
      </div>
    );
  },
};

export const Info: StoryObj<typeof DefaultSnack> = {
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  render: args => {
    const { snackbar } = useSnackbar();
    return (
      <div className="h-[300px] w-[70vw]">
        <Button
          variants={{ intent: 'primary' }}
          onClick={() => snackbar.show('info', args.text)}
        >
          Show Snack info
        </Button>
      </div>
    );
  },
};
