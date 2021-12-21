import { storiesOf } from '@storybook/react-native';
import { Button, Modal, ModalView, Text } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Modal', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Modal', () => {
    return <Component />;
  });

const Component = () => {
  const [visible, setVisible] = useState<boolean>(false);
  console.log(visible);

  // const { add } = useModalManager()

  // const control = add(
  //   <>

  //   </>
  // )

  return (
    <>
    <Modal onBackDropPress={() => console.log("close")}>
      <ModalView>
          <Text>Modal 1</Text>    
          <Text>Modal 1</Text>    
          <Text>Modal 1</Text>    
          <Text>Modal 1</Text>    
      </ModalView>
    </Modal>


      <Modal onBackDropPress={() => console.log("close")}>
      <ModalView>
          <Text>Modal 2</Text>    
          <Text>Modal 2</Text>    
      </ModalView>
      </Modal>

      <Button onPress={() => setVisible(old => !old) }></Button>
    </>
  );
};
