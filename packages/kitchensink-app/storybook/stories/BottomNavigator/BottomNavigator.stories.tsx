import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { BottomNavigator } from '@tecsinapse/react-native-kit';
import styled from '@emotion/native';

storiesOf('BottomNavigator', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('BottomNavigator', () => (
    <Container>
      <Component />
    </Container>
  ));

const Component = () => {
  const [selected, setSelected] = React.useState(1);

  return (
    <BottomNavigator selected={selected} onSelect={value => setSelected(value)}>
      <BottomNavigator.Item
        value={1}
        icon={{
          type: 'font-awesome-5',
          name: 'home',
        }}
      />
      <BottomNavigator.Item
        value={2}
        icon={{
          type: 'font-awesome-5',
          name: 'calendar-alt',
        }}
      />
      <BottomNavigator.Item
        value={3}
        icon={{
          type: 'font-awesome-5',
          name: 'user',
        }}
      />
      <BottomNavigator.Item
        value={4}
        icon={{
          type: 'font-awesome-5',
          name: 'tachometer-alt',
        }}
      />
      <BottomNavigator.Item
        value={5}
        icon={{
          type: 'font-awesome-5',
          name: 'bars',
        }}
      />
    </BottomNavigator>
  );
};

const Container = styled.View`
  justify-content: flex-end;
  height: 100%;
`;
