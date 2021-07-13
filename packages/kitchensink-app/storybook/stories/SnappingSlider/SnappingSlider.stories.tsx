import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { SnappingSlider } from '@tecsinapse/react-native-kit';
import { View } from 'react-native';

storiesOf('SnappingSlider', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('SnappingSlider', () => {
    return <Component />;
  });

const Component = () => {
  const Child = () => (
    <View style={{ width: '100%', height: 200, backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16) }} />
  );

  return (
    <SnappingSlider showAmount={3} scrollAmount={2} spacing={'centi'}>
      {[...Array(10).keys()].map(i => (
        <Child key={i} />
      ))}
    </SnappingSlider>
  );
};
