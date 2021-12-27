import { storiesOf } from '@storybook/react-native';
import { Button, IBaseModal, ModalGroupManager, ModalView, Text, useModalManager } from '@tecsinapse/react-native-kit';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ArtBoard } from '../ArtBoard';

storiesOf('Modal', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Modal', () => {
    return <Component />;
  });

const MyModal: FC<IBaseModal> = ({ close, ...others }) => {
  return (
    <ModalView {...others } close={close}>
      <View style={{ padding: 20 }}>
        <Text typography='h2'>Hey, I'm a modal!</Text>
        <Button onPress={close}><Text>Close me!</Text></Button>
      </View>
    </ModalView>
  )
}

const App = () => {
  const myModal = useModalManager(() => <MyModal/>)
  return (
    <Button onPress={() => myModal.show() }><Text>Open a little modal</Text></Button>
  )
}

const Component = () => {
  return (
    <SafeAreaProvider>
      <ModalGroupManager>
        <App/>
      </ModalGroupManager>
    </SafeAreaProvider>
  );
};
