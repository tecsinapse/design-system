import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#ffffff',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

import BottomNavigator from './components/molecules/BottomNavigator/BottomNavigator';
import BottomNavigatorItem from './components/molecules/BottomNavigator/Item';
import Calendar from './components/molecules/Calendar/Calendar';
import DateBlock from './components/molecules/ScrollableSelector/components/DateBlock';
import Grid from './components/molecules/Grid/Grid';
import GridItem from './components/molecules/Grid/Item';
import Hint from './components/atoms/Input/Hint';
import HintInputContainer from './components/molecules/HintInputContainer/HintInputContainer';
import IconTextButton from './components/molecules/IconTextButton/IconTextButton';
import InputContainer from './components/atoms/Input/InputContainer';
import InputElement from './components/atoms/Input/InputElement';
import LabeledSwitch from './components/molecules/LabeledSwitch/LabeledSwitch';
import PressableInputContainer from './components/atoms/Input/PressableInputContainer';
import ScrollableSelector from './components/molecules/ScrollableSelector/ScrollableSelector';
import Snackbar from './components/molecules/Snackbar/Snackbar';
import SnappingSlider from './components/molecules/SnappingSlider/SnappingSlider';
import Text from './components/atoms/Text/Text';
import TextArea from './components/molecules/TextArea/TextArea';

const TID = 'contract-root';

type Case = {
  name: string;
  render: (props: { testID: string; className: string }) => React.ReactElement;
  /** Base class the consumer's class must defeat, when the root sets one. */
  defeats?: string;
};

const molecules: Case[] = [
  { name: 'Grid', render: p => <Grid {...p}>{[<Text key="a">t</Text>]}</Grid> },
  {
    name: 'GridItem',
    render: p => (
      <GridItem {...p} span={12} wrapper>
        <Text>t</Text>
      </GridItem>
    ),
  },
  {
    name: 'InputContainer',
    render: p => (
      <InputContainer {...p}>
        <Text>t</Text>
      </InputContainer>
    ),
  },
  { name: 'InputElement', render: p => <InputElement {...p} /> },
  {
    name: 'PressableInputContainer',
    render: p => (
      <PressableInputContainer {...p}>
        <Text>t</Text>
      </PressableInputContainer>
    ),
  },
  {
    name: 'HintInputContainer',
    render: p => (
      <HintInputContainer {...p} focused={false}>
        <Text>t</Text>
      </HintInputContainer>
    ),
  },
  { name: 'Hint', render: p => <Hint {...p} hint="h" /> },
  {
    name: 'LabeledSwitch',
    render: p => (
      <LabeledSwitch
        {...p}
        leftLabel="l"
        active
        onChange={() => undefined}
      />
    ),
  },
  { name: 'IconTextButton', render: p => <IconTextButton {...p} label="t" /> },
  { name: 'TextArea', render: p => <TextArea {...p} value="t" /> },
  {
    name: 'SnappingSlider',
    render: p => (
      <SnappingSlider {...p} showAmount={2} scrollAmount={1}>
        <Text>t</Text>
      </SnappingSlider>
    ),
  },
  {
    name: 'BottomNavigator',
    render: p => (
      <BottomNavigator {...p} selected="a" onSelect={() => undefined}>
        <BottomNavigatorItem value="a" label="a" />
      </BottomNavigator>
    ),
    defeats: 'bg-surface-overlay',
  },
  {
    name: 'BottomNavigatorItem',
    render: p => <BottomNavigatorItem {...p} value="a" label="a" />,
  },
  {
    name: 'DateBlock',
    render: p => (
      <DateBlock
        {...p}
        digits={[1, 2, 3]}
        value={1}
        date={new Date(2026, 0, 1)}
        type="day"
        height={30}
        onChange={() => undefined}
      />
    ),
  },
  {
    name: 'ScrollableSelector',
    render: p => <ScrollableSelector {...p} date={new Date(2026, 0, 1)} />,
  },
  {
    name: 'Calendar',
    render: p => <Calendar {...p} />,
  },
  {
    name: 'Snackbar',
    render: p => (
      <Snackbar {...p} open>
        <Text>t</Text>
      </Snackbar>
    ),
  },
];

describe.each(molecules)(
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
