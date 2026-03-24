import {
  Button,
  IBaseModal,
  Input,
  ModalView,
  Text,
  useModalManager,
  useModalRemoteControl,
} from '@tecsinapse/react-native-kit';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { Meta } from '@storybook/react';

const StoryMeta: Meta<typeof ModalView> = {
  title: 'Modal',
  component: ModalView,
};

export default StoryMeta;

export const Base = () => {
  const myModal = useModalManager(() => <MyModal />);
  const data = [...new Array(101).keys()];

  return (
    <View style={{height: 100, backgroundColor: '#6e6e6e'}}>
      <Button onPress={() => myModal.show()}>
        <Text>Open a little modal</Text>
      </Button>

      <ScrollView horizontal style={{ gap: 20}}>
        {data.map(it => (
          <View key={it} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f6f6f6', gap: 20}}>
            <Text>{it}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

  );
};

export const Remote = () => {
  useModalManager(() => <MyModal />, 'modalTest');
  const remoteModal = useModalRemoteControl('modalTest');

  return (
    <Button onPress={() => remoteModal.show()}>
      <Text>Open a remote modal</Text>
    </Button>
  );
};

const InnerModal: FC<IBaseModal> = ({ close, ...others }) => {
  return (
    <ModalView {...others} close={close}>
      <View style={{ padding: 20 }}>
        <Text typography="h2">Hey, I'm a modal!</Text>
        <Input value={''}></Input>
        <Button onPress={close}>
          <Text>Close me!</Text>
        </Button>
      </View>
    </ModalView>
  );
};

const MyModal: FC<IBaseModal> = ({ close, ...others }) => {
  const data = [...new Array(101).keys()];
  const modal = useModalManager(() => <InnerModal />);

  return (
    <ModalView {...others} close={close}>
      <View style={{ padding: 20, gap: 10 }}>
        <Text typography="h2">Hey, I'm a modal!</Text>
        <View style={{height: 100, backgroundColor: '#6e6e6e'}}>
          <ScrollView horizontal style={{zIndex: 9999}}>
            {data.map(it => (
              <View key={it} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f6f6f6'}}>
                <Text>{it}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Input value={''}></Input>
        <Button onPress={close}>
          <Text>Close me!</Text>
        </Button>
        <Button onPress={() => modal.show()}>
          <Text>New modal</Text>
        </Button>
      </View>
    </ModalView>
  );
};
