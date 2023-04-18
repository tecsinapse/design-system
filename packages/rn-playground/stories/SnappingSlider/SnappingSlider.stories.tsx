import React from 'react';
import { Paper, SnappingSlider } from '@tecsinapse/react-native-kit';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof SnappingSlider> = {
  title: 'SnappingSlider',
  component: SnappingSlider,
};

export default StoryMeta;

export const Base = () => {
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
