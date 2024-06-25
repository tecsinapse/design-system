import React, { useEffect } from 'react';
import { StoryFn } from '@storybook/react';
import { Snackbar, Button, DefaultSnack } from '../src';
import { defaultIntents } from './utils';
import { Toaster } from 'sonner';
import { Snack } from '../src/service/Snack';

export default {
  title: 'Cortex/Snackbar',
  component: DefaultSnack,
};

const Template: StoryFn = args => {
  const snack = new Snack();
  return (
    <div className={'flex gap-x-deca'}>
      <Button
        variants={{ intent: 'primary' }}
        onClick={() =>
          snack.default(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          )
        }
      >
        Show Snack Default
      </Button>
      <Button
        variants={{ intent: 'error' }}
        onClick={() =>
          snack.error(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          )
        }
      >
        Show Snack Error
      </Button>
      <Button
        variants={{ intent: 'success' }}
        onClick={() =>
          snack.success(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          )
        }
      >
        Show Snack success
      </Button>
      <Button
        variants={{ intent: 'warning' }}
        onClick={() =>
          snack.warning(
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          )
        }
      >
        Show Snack warning
      </Button>
      <Button
        variants={{ intent: 'info' }}
        onClick={() =>
          snack.info(
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
