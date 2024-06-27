import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button, DefaultSnackSonner, Snackbar } from '../src';
import { Toaster } from 'sonner';

export default {
  title: 'Cortex/Snackbar',
  component: DefaultSnackSonner,
};

const Template: StoryFn = () => {
  const snack = new Snackbar();
  return (
    <div className={'flex gap-x-deca'}>
      <Button
        variants={{ intent: 'primary' }}
        onClick={() =>
          snack.show(
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
          snack.show(
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
          snack.show(
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
          snack.show(
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
          snack.show(
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
