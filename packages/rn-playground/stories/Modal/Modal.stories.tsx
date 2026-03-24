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

  return (
    <Button onPress={() => myModal.show()}>
      <Text>Open a little modal</Text>
    </Button>
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
const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


const MyModal: FC<IBaseModal> = ({ close, ...others }) => {
  const modal = useModalManager(() => <InnerModal />);
  return (
    <ModalView {...others} close={close} frozen>
      <View style={{ padding: 20 }}>
        <View>
          <ScrollView horizontal style={{ gap: 20 }}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{width: 100, height: 100, backgroundColor: "red"}}
              >
                <Text >{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Text typography="h2">Hey, I'm a modal!</Text>
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
