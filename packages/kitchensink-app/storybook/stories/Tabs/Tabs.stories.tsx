import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import { Tab, Tabs } from '@tecsinapse/react-native-kit';
import styled from '@emotion/native';

storiesOf('Tabs', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Tabs', () => (
    <Container>
      <Component />
    </Container>
  ));

const Component = () => {
  const [selected, setSelected] = React.useState(1);

  return (
    <Tabs selected={selected} onSelect={value => setSelected(value)}>
      <Tab
        value={1}
        icon={{
          type: 'font-awesome-5',
          name: 'home',
        }}
      />
      <Tab
        value={2}
        icon={{
          type: 'font-awesome-5',
          name: 'calendar-alt',
        }}
      />
      <Tab
        value={3}
        icon={{
          type: 'font-awesome-5',
          name: 'user',
        }}
      />
      <Tab
        value={4}
        icon={{
          type: 'font-awesome-5',
          name: 'tachometer-alt',
        }}
      />
      <Tab
        value={5}
        icon={{
          type: 'font-awesome-5',
          name: 'bars',
        }}
      />
    </Tabs>
  );
};

const Container = styled.View`
  justify-content: flex-end;
  height: 100%;
`;
