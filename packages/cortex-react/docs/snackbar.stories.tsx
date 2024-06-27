import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button, DefaultSnack } from '../src';
import { Toaster } from 'sonner';
import { useSnackbar } from '../src/provider/SnackbarProvider';

export default {
  title: 'Cortex/SnackbarSonner',
  component: DefaultSnack,
};

const Template: StoryFn = () => {
  const { snackbar } = useSnackbar();

  return (
    <div className={'flex gap-x-deca'}>
      <Button
        variants={{ intent: 'primary' }}
        onClick={() =>
          snackbar.show(
            'default',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          )
        }
      >
        Show Snack Default
      </Button>
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
      <Toaster />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
