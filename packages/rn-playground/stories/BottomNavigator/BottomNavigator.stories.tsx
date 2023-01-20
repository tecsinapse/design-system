import React from 'react';
import { BottomNavigator, Text } from '@tecsinapse/react-native-kit';
import { Pressable } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof BottomNavigator> = {
  title: 'BottomNavigator',
  component: BottomNavigator,
};

export default StoryMeta;

export const Base = () => {
  const [selected, setSelected] = React.useState(1);

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
          labelElement={<Text typography={'sub'}>Home</Text>}
          icon={{
            type: 'font-awesome-5',
            name: 'home',
          }}
        />
        <BottomNavigator.Item
          value={2}
          labelElement={<Text typography={'sub'}>Agenda</Text>}
          icon={{
            type: 'font-awesome-5',
            name: 'calendar-alt',
          }}
        />
        <BottomNavigator.Item
          value={3}
          labelElement={<Text typography={'sub'}>User</Text>}
          icon={{
            type: 'font-awesome-5',
            name: 'user',
          }}
        />
        <BottomNavigator.Item
          value={4}
          labelElement={<Text typography={'sub'}>???</Text>}
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
