import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => <View {...props} />,
  };
});

import Avatar from './components/atoms/Avatar/Avatar';
import Badge from './components/atoms/Badge/Badge';
import BoxContent from './components/atoms/BoxContent/BoxContent';
import Button from './components/atoms/Button/Button';
import CardFooter from './components/atoms/Card/Footer';
import CardHeader from './components/atoms/Card/Header';
import Checkbox from './components/atoms/Checkbox/Checkbox';
import Divider from './components/atoms/Divider/Divider';
import GroupButton from './components/atoms/GroupButton/GroupButton';
import Icon from './components/atoms/Icon/Icon';
import Paper from './components/atoms/Paper/Paper';
import PressableSurface from './components/atoms/PressableSurface/PressableSurface';
import ProgressBar from './components/atoms/ProgressBar/ProgressBar';
import RadioButton from './components/atoms/RadioButton/RadioButton';
import Skeleton from './components/atoms/Skeleton/Skeleton';
import Tag from './components/atoms/Tag/Tag';
import Text from './components/atoms/Text/Text';

export const TID = 'contract-root';

export type Case = {
  name: string;
  render: (props: { testID: string; className: string }) => React.ReactElement;
  /** Base class the consumer's class must defeat, when the root sets one. */
  defeats?: string;
};

const atoms: Case[] = [
  { name: 'Text', render: p => <Text {...p}>t</Text> },
  { name: 'Button', render: p => <Button {...p} title="t" /> },
  { name: 'Icon', render: p => <Icon {...p} name="check" type="ionicon" /> },
  { name: 'Divider', render: p => <Divider {...p} /> },
  {
    name: 'BoxContent',
    render: p => <BoxContent {...p} variant="top" />,
    defeats: 'bg-surface-overlay',
  },
  {
    name: 'Paper',
    render: p => <Paper {...p} />,
    defeats: 'bg-surface-overlay',
  },
  { name: 'Tag', render: p => <Tag {...p} value="t" /> },
  { name: 'Badge', render: p => <Badge {...p} value={1} /> },
  { name: 'Checkbox', render: p => <Checkbox {...p} /> },
  { name: 'RadioButton', render: p => <RadioButton {...p} /> },
  { name: 'PressableSurface', render: p => <PressableSurface {...p} /> },
  { name: 'ProgressBar', render: p => <ProgressBar {...p} valueNow={50} /> },
  { name: 'Avatar', render: p => <Avatar {...p} name="Ada Lovelace" /> },
  { name: 'Skeleton', render: p => <Skeleton {...p} width={10} height={10} /> },
  {
    name: 'GroupButton',
    render: p => (
      <GroupButton
        {...p}
        value="a"
        options={[{ value: 'a' }, { value: 'b' }]}
        renderKey={option => option}
        renderOption={option => <Text>{option}</Text>}
        onChange={() => undefined}
      />
    ),
  },
  { name: 'CardHeader', render: p => <CardHeader {...p} /> },
  { name: 'CardFooter', render: p => <CardFooter {...p} /> },
];

describe.each(atoms)(
  '$name className contract',
  ({ render: renderCase, defeats }) => {
    it('forwards the consumer className to its root', () => {
      const { getByTestId } = render(
        renderCase({ testID: TID, className: 'mt-kilo' })
      );
      expect(getByTestId(TID).props.className as string).toContain('mt-kilo');
    });

    if (defeats) {
      it(`lets the consumer class defeat ${defeats}`, () => {
        const { getByTestId } = render(
          renderCase({ testID: TID, className: 'bg-red-500' })
        );
        const className = getByTestId(TID).props.className as string;
        expect(className).toContain('bg-red-500');
        expect(className).not.toContain(defeats);
      });
    }
  }
);
