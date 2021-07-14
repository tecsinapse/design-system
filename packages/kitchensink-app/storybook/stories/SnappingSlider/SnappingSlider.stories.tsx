import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { Paper, SnappingSlider } from '@tecsinapse/react-native-kit';

storiesOf('SnappingSlider', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('SnappingSlider', () => {
    return <Component />;
  });

const Component = () => {
  const Child = () => <Paper elevated style={{ width: '100%', height: 150 }} />;

  return (
    <>
      <SnappingSlider
        style={{ overflow: 'visible' }}
        showAmount={1}
        scrollAmount={1}
        spacing={'centi'}
      >
        {[...Array(10).keys()].map(i => (
          <Child key={i} />
        ))}
      </SnappingSlider>
      <SnappingSlider
        style={{ overflow: 'visible' }}
        showAmount={2}
        scrollAmount={2}
        spacing={'centi'}
      >
        {[...Array(10).keys()].map(i => (
          <Child key={i} />
        ))}
      </SnappingSlider>
      <SnappingSlider
        style={{ overflow: 'visible' }}
        showAmount={3}
        scrollAmount={2}
        spacing={'centi'}
      >
        {[...Array(10).keys()].map(i => (
          <Child key={i} />
        ))}
      </SnappingSlider>
    </>
  );
};
