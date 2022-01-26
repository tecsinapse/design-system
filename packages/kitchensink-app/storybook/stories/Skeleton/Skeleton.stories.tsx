import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { ArtBoard } from '../ArtBoard';
import {
  Avatar,
  Button,
  Grid,
  Input,
  Select,
  Skeleton,
  Text,
  TextArea,
} from '@tecsinapse/react-native-kit';

storiesOf('Skeleton', module)
  .addDecorator(getStory => (
    <ArtBoard backgroundColor="#FFF">{getStory()}</ArtBoard>
  ))
  .add('Skeleton', () => <Component />);

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

const Component = () => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval = 0;
    if (active) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, seconds]);

  return (
    <>
      <Button onPress={() => setActive(!active)}>
        <Text fontColor={'light'} fontWeight={'bold'}>
          {active ? 'Stop Skeleton' : 'Try Skeleton'}
        </Text>
      </Button>

      <Grid spacing={'mili'} layout={[[12], [6, 6], [12], [2, 10], [6, 6]]}>
        <Skeleton active={active}>
          <Input style={{ width: '100%' }} />
        </Skeleton>

        <Skeleton active={active}>
          <Text>Teste text</Text>
        </Skeleton>

        <Skeleton active={active}>
          <TextArea value={'Teste text'} />
        </Skeleton>

        <Skeleton active={active}>
          <Button>
            <Text>Button</Text>
          </Button>
        </Skeleton>

        <Skeleton active={active} radius={'pill'}>
          <Avatar name={'Usuario Teste'} />
        </Skeleton>

        <Skeleton active={active}>
          <Select
            options={options}
            label="Single value"
            placeholder="Select one value"
            value={undefined}
            type={'single'}
            hideSearchBar
            onSelect={() => {}}
            selectModalTitle={'Selecione uma opção'}
            labelExtractor={item => item.label}
            searchBarPlaceholder={'Busque uma opção'}
            confirmButtonText={'Confirmar'}
            keyExtractor={item => String(item.key)}
          />
        </Skeleton>

        <Skeleton width={150} height={150} active={active} radius={'pill'} />

        <Skeleton
          width={150}
          height={150}
          active={active}
          radius={'pill'}
          animation={'pulse'}
        />
      </Grid>
    </>
  );
};
