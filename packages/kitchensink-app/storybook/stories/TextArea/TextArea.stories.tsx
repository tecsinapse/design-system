import { storiesOf } from '@storybook/react-native';
import { TextArea } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('TextArea', () => {
    return <Component />;
  });

const lorem = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis erat eget imperdiet efficitur. Pellentesque bibendum ipsum erat, at lobortis risus sollicitudin eu. Praesent quis ex nec arcu cursus egestas vel a velit. Suspendisse aliquam orci id nulla ullamcorper scelerisque a id sem. Morbi orci tortor, consectetur eu felis maximus, posuere congue erat. Etiam aliquam convallis elit et sodales. Sed porttitor purus non tortor pharetra pharetra. Donec luctus, eros ultrices luctus accumsan, nibh turpis condimentum ligula, et feugiat mauris elit eget enim. Sed vestibulum mi et tellus tempor fringilla. Mauris sit amet ornare dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";
const Component = () => {
  const [value, setValue] = useState<string>(lorem);
  return (
    <TextArea
      label="Say something"
      placeholder="Nop!"
      value={value}
      onChange={setValue}
      numberOfLines={5}
      maxLength={255}
    />
  );
};
