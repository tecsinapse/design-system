import {
  Button,
  type IBaseModal,
  Input,
  ModalView,
  Text,
  useModalManager,
  useModalRemoteControl,
} from '@tecsinapse/cortex-native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Meta } from '@storybook/react-vite';

const StoryMeta: Meta<typeof ModalView> = {
  title: 'Modal',
  component: ModalView,
};

export default StoryMeta;

export const Base = () => {
  const myModal = useModalManager(() => <MyModal />);

  return <Button title="Open a little modal" onPress={() => myModal.show()} />;
};

export const Remote = () => {
  useModalManager(() => <MyModal />, 'modalTest');
  const remoteModal = useModalRemoteControl('modalTest');

  return (
    <Button title="Open a remote modal" onPress={() => remoteModal.show()} />
  );
};

export const InvisibleOverlay = () => {
  const [taps, setTaps] = React.useState(0);
  const control = useModalManager(() => <InnerModal />);
  const broken = useModalManager(() => <DroppedCloseModal />);
  return (
    <View>
      <Button title="Abrir controle" onPress={() => control.show()} />
      <Button title="Reproduzir overlay" onPress={() => broken.show()} />
      <Button
        title={`Toques no fundo: ${taps}`}
        onPress={() => setTaps(n => n + 1)}
      />
    </View>
  );
};

const DroppedCloseModal: FC<IBaseModal> = ({
  onClose: _onClose,
  close,
  ...props
}) => (
  <ModalView {...props} close={close}>
    <Button title="Fechar sem encaminhar onClose" onPress={close} />
  </ModalView>
);

const InnerModal: FC<IBaseModal> = ({ close, ...others }) => {
  return (
    <ModalView {...others} close={close}>
      <View style={{ padding: 20 }}>
        <Text typography="h2">Hey, I'm a modal!</Text>
        <Input value={''}></Input>
        <Button title="Close me!" onPress={close} />
      </View>
    </ModalView>
  );
};

const MyModal: FC<IBaseModal> = ({ close, ...others }) => {
  const modal = useModalManager(() => <InnerModal />);
  return (
    <ModalView {...others} close={close}>
      <View style={{ padding: 20 }}>
        <Text typography="h2">Hey, I'm a modal!</Text>
        <Input value={''}></Input>
        <Button title="Close me!" onPress={close} />
        <Button title="New modal" onPress={() => modal.show()} />
      </View>
    </ModalView>
  );
};
