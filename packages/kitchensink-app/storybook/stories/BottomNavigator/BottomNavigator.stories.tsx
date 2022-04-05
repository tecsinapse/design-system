import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ArtBoard } from '../ArtBoard';
import {
  BottomNavigator,
  Icon,
  Text,
  Button,
} from '@tecsinapse/react-native-kit';
import styled from '@emotion/native';
import { Pressable } from 'react-native';

storiesOf('BottomNavigator', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('BottomNavigator', () => (
    <Container>
      <Component />
    </Container>
  ));

const Component = () => {
  const [selected, setSelected] = React.useState(1);

  function renderText(text: string): React.ReactNode {
    return <Text typography={'sub'}>{text}</Text>;
  }

  return (
    <>
      <Text>Labelled with label prop</Text>
      <BottomNavigator
        selected={selected}
        onSelect={value => setSelected(value)}
      >
        <BottomNavigator.Item
          value={1}
          label={'Home'}
          icon={{
            type: 'font-awesome-5',
            name: 'home',
          }}
        />
        <BottomNavigator.Item
          value={2}
          label={'Agenda'}
          icon={{
            type: 'font-awesome-5',
            name: 'calendar-alt',
          }}
        />
        <BottomNavigator.Item
          value={3}
          label={'User'}
          icon={{
            type: 'font-awesome-5',
            name: 'user',
          }}
        />
        <BottomNavigator.Item
          value={4}
          label={'???'}
          icon={{
            type: 'font-awesome-5',
            name: 'tachometer-alt',
          }}
        />
        <BottomNavigator.Item
          value={5}
          label={'Menu'}
          icon={{
            type: 'font-awesome-5',
            name: 'bars',
          }}
        />
      </BottomNavigator>

      <Text>Labelled with custom label element</Text>
      <BottomNavigator
        selected={selected}
        onSelect={value => setSelected(value)}
      >
        <BottomNavigator.Item
          value={1}
          labelElement={renderText('Home')}
          icon={{
            type: 'font-awesome-5',
            name: 'home',
          }}
        />
        <BottomNavigator.Item
          value={2}
          labelElement={renderText('Agenda')}
          icon={{
            type: 'font-awesome-5',
            name: 'calendar-alt',
          }}
        />
        <BottomNavigator.Item
          value={3}
          labelElement={renderText('User')}
          icon={{
            type: 'font-awesome-5',
            name: 'user',
          }}
        />
        <BottomNavigator.Item
          value={4}
          labelElement={renderText('???')}
          icon={{
            type: 'font-awesome-5',
            name: 'tachometer-alt',
          }}
        />
      </BottomNavigator>

      <Text>Icon only</Text>
      <BottomNavigator
        selected={selected}
        onSelect={value => setSelected(value)}
      >
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
      </BottomNavigator>

      <Text>Custom element</Text>
      <BottomNavigator
        selected={selected}
        onSelect={value => setSelected(value)}
      >
        <BottomNavigator.Item value={1}>
          <Pressable onPress={() => setSelected(1)}>
            <Text colorVariant={selected === 1 ? 'primary' : 'secondary'}>
              1
            </Text>
          </Pressable>
        </BottomNavigator.Item>
        <BottomNavigator.Item value={2}>
          <Pressable onPress={() => setSelected(2)}>
            <Text colorVariant={selected === 2 ? 'primary' : 'secondary'}>
              2
            </Text>
          </Pressable>
        </BottomNavigator.Item>
      </BottomNavigator>
    </>
  );
};

const Container = styled.View`
  justify-content: flex-end;
  height: 100%;
`;
