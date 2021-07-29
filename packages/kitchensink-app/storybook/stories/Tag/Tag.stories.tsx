import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Tag, IconProps } from '@tecsinapse/react-native-kit';
import { ArtBoard } from '../ArtBoard';

storiesOf('Tag', module)
  .addDecorator(getStory => (
    <ArtBoard backgroundColor="#FFF">{getStory()}</ArtBoard>
  ))
  .add('Tag', () => <Component />);

const Component = () => {
  return (
    <Tag
      value="Label"
      icon={{ name: 'stopwatch', type: 'fontisto' } as IconProps}
      variant="small"
      dismiss
      onDismiss={() => alert('Dismiss')}
    />
  );
};
