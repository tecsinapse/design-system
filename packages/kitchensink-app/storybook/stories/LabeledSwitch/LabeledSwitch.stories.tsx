import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Divider, LabeledSwitch } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('LabeledSwitch', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)

  .add('LabeledSwitch', () => <Component />);

const Component = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);

  return (
    <>
      <LabeledSwitch
        active={check1}
        onChange={setCheck1}
        rightLabel={'Labeled switch without pressable label'}
      />
      <Divider linePosition="bottom" style={{ margin: 16 }} />
      <LabeledSwitch
        active={check2}
        onChange={setCheck2}
        rightLabel={'Labeled switch with pressable label'}
        pressableLabel={true}
      />
      <Divider linePosition="bottom" style={{ margin: 16 }} />

      <LabeledSwitch
        active={check3}
        onChange={setCheck3}
        rightLabel={'right text'}
        leftLabel={'left text'}
        pressableLabel={true}
      />
    </>
  );
};
