import { Meta, StoryObj } from '@storybook/react';
import { Button, Card } from '../src';
import { ThemeProvider, useDarkTheme } from '@tecsinapse/cortex-core';
import { useMemo } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { IoMdArrowForward } from 'react-icons/io';

export default {
  title: 'Cortex/Dark Mode',
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Default: StoryObj = {
  args: {
    children: (
      <div className={'w-[300px] text-default'}>
        <p className={'text-h5 font-bold'}>Exemple card</p>
        <div className={'flex flex-row items-center gap-x-deca mt-deca'}>
          <Button variants={{ variant: 'outline', size: 'small' }}>
            <IoMdArrowForward />
          </Button>
          <p className={''}>Exemple description card</p>
        </div>
      </div>
    ),
  },
  render: args => {
    const { theme, toggleTheme } = useDarkTheme();
    const isDark = useMemo(() => theme === 'dark', [theme]);
    return (
      <div className="h-[500px] w-[500px] bg-body flex flex-col justify-center items-center">
        <Card>{args.children}</Card>
        <Button onClick={toggleTheme} className="fixed bottom-8 right-8">
          {isDark ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
    );
  },
};
