import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Button, DefaultSnack } from '../src';
import {
  SnackbarProvider,
  useSnackbar,
} from '../src/provider/SnackbarProvider';

export default {
  title: 'Cortex/Snackbar',
  component: DefaultSnack,
  args: {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
} as Meta<typeof DefaultSnack>;

export const Primary: StoryFn<typeof DefaultSnack> = args => {
  const { snackbar } = useSnackbar();
  return (
    <Button
      variants={{ intent: 'primary' }}
      onClick={() => snackbar.show('default', args.text)}
    >
      Show Snack Default
    </Button>
  );
};

export const Error: StoryFn<typeof DefaultSnack> = args => {
  const { snackbar } = useSnackbar();
  return (
    <Button
      variants={{ intent: 'error' }}
      onClick={() =>
        snackbar.show(
          'error',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        )
      }
    >
      Show Snack Error
    </Button>
  );
};

export const Success: StoryFn<typeof DefaultSnack> = args => {
  const { snackbar } = useSnackbar();
  return (
    <Button
      variants={{ intent: 'success' }}
      onClick={() =>
        snackbar.show(
          'success',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        )
      }
    >
      Show Snack success
    </Button>
  );
};

export const Warning: StoryFn<typeof DefaultSnack> = args => {
  const { snackbar } = useSnackbar();
  return (
    <Button
      variants={{ intent: 'warning' }}
      onClick={() =>
        snackbar.show(
          'warning',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        )
      }
    >
      Show Snack warning
    </Button>
  );
};

export const Info: StoryFn<typeof DefaultSnack> = args => {
  const { snackbar } = useSnackbar();
  return (
    <Button
      variants={{ intent: 'info' }}
      onClick={() =>
        snackbar.show(
          'info',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        )
      }
    >
      Show Snack info
    </Button>
  );
};
