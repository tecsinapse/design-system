import { storiesOf } from '@storybook/react-native';
import { Button, IBaseModal, Input, ModalView, Text, useModalManager } from '@tecsinapse/react-native-kit';
import { useModalRemoteControl } from '@tecsinapse/react-native-kit';
import React, { FC } from 'react';
import { View } from 'react-native';
import { ArtBoard } from '../ArtBoard';

storiesOf('Modal', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Modal', () => {
    return (
      <>
        <Component />
        <Component2 />
      </>
    );
  });

const MyModal2: FC<IBaseModal> = ({ close, ...others }) => {
  return (
    <ModalView {...others } close={close}>
      <View style={{ padding: 20 }}>
        <Text typography='h2'>Hey, I'm a modal!</Text>
        <Input value={''}></Input>
        <Button onPress={close}><Text>Close me!</Text></Button>
      </View>
    </ModalView>
  )
}

const MyModal: FC<IBaseModal> = ({ close, ...others }) => {
  const modal = useModalManager(() => <MyModal2/>)
  return (
    <ModalView {...others } close={close}>
      <View style={{ padding: 20 }}>
        <Text typography='h2'>Hey, I'm a modal!</Text>
        <Input value={''}></Input>
        <Button onPress={close}><Text>Close me!</Text></Button>
        <Button onPress={() => modal.show()}><Text>New modal</Text></Button>
      </View>
    </ModalView>
  )
}

const Component = () => {
  const myModal = useModalManager(() => <MyModal/>)
  const remoteModal = useModalRemoteControl('modalTest')

  return (
    <>
      <Button onPress={() => myModal.show() }><Text>Open a little modal</Text></Button>
      <Button onPress={() => remoteModal.show() }><Text>Open a remote modal</Text></Button>
    </>
  )
}

const Component2 = () => {
  useModalManager(() => <MyModal/>, 'modalTests')
  return null
}