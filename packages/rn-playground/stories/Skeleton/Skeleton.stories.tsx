import React, { useEffect, useRef, useState } from 'react';
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

import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Skeleton> = {
  title: 'Skeleton',
  component: Skeleton,
  args: {
    animation: 'wave',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Skeleton>;

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

export const Base = (args: IStory) => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const interval = useRef<NodeJS.Timer>();

  const animation = args?.args?.animation;

  useEffect(() => {
    if (active) {
      interval.current = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [active, seconds]);

  return (
    <>
      <Button onPress={() => setActive(!active)}>
        <Text fontColor={'light'} fontWeight={'bold'}>
          {active ? 'Stop Skeleton' : 'Try Skeleton'}
        </Text>
      </Button>

      <Grid spacing={'mili'} layout={[[12], [6, 6], [12], [2, 10], [6, 6]]}>
        <Skeleton animation={animation} active={active}>
          <Input style={{ width: '100%' }} />
        </Skeleton>

        <Skeleton animation={animation} active={active}>
          <Text>Teste text</Text>
        </Skeleton>

        <Skeleton animation={animation} active={active}>
          <TextArea value={'Teste text'} />
        </Skeleton>

        <Skeleton animation={animation} active={active}>
          <Button>
            <Text>Button</Text>
          </Button>
        </Skeleton>

        <Skeleton animation={animation} active={active} radius={'pill'}>
          <Avatar name={'Usuario Teste'} />
        </Skeleton>

        <Skeleton animation={animation} active={active}>
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

        <Skeleton
          animation={animation}
          width={150}
          height={150}
          active={active}
          radius={'pill'}
        />

        <Skeleton
          animation={animation}
          width={150}
          height={150}
          active={active}
          radius={'pill'}
        />
      </Grid>
    </>
  );
};
