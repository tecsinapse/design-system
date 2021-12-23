import { storiesOf } from '@storybook/react-native';
import { Button, ModalManager, ModalProps, ModalView, Text, useModalManager } from '@tecsinapse/react-native-kit';
import React, { FC, useState } from 'react';
import { ArtBoard } from '../ArtBoard';

storiesOf('Modal', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Modal', () => {
    return <Component />;
  });



// const Cp1 = ({ action }) => {
//   const [text, setText] = useState('First text!')
//   useEffect(() => {
//     console.log("run animation!");
//     return () => console.log("destroyed!");
//   }, [])
//   return (
//     <View style={{ backgroundColor: 'red' }}>
//       <Text typography='h2'>{text}</Text>
//       <Button color='info' onPress={() => {
//         setText("wow!")
//         action?.()
//       }}><Text>Modal fire!</Text></Button>
//       <Button color='info' onPress={() => {} }><Text>Close current modal</Text></Button>
//     </View>
//   )
// }




interface Opa extends ModalProps { 
  pass?: number
}

const Cp5: FC<Opa> = ({ ...others }) => {
  return (
    <ModalView {...others }>
      <Text typography='h2'>Modal 5</Text>
    </ModalView>
  )
}

const Cp4: FC<Opa> = ({ close, ...others }) => {
  return (
    <ModalView {...others } close={close}>
      <Text typography='h2'>Modal 4</Text>
      <Button onPress={close}><Text>Close modal 4</Text></Button>
    </ModalView>
  )
}

const Cp3: FC<Opa> = ({ pass, close, ...others }) => {
  const opa = useModalManager('modal4', () => <Cp4/>)
  return (
    <ModalView {...others } close={close}>
      <Text typography='h2'>Modal 3 ({pass})</Text>
      <Button onPress={() => opa.show()}><Text>Open modal 4</Text></Button>
      <Button onPress={close}><Text>Close current modal</Text></Button>
    </ModalView>
  )
}

const Cp2: FC<Opa> = ({ close, ...others }) => {
  const [ num, setNum ] = useState(0)
  const opa = useModalManager('modal3', () => <Cp3 pass={num}/>)
  // console.log("MODAL->", others)
  return (
    <ModalView {...others } close={close}>
      <Text typography='h2'>Modal 2 ({num})</Text>
      <Button onPress={() => opa.show()}><Text>Open modal 3</Text></Button>
      <Button onPress={close}><Text>Close current modal</Text></Button>
      <Button onPress={() => setNum(old => old + 1)}><Text>+</Text></Button>
    </ModalView>
  )
}


const App = () => {
  const ha = () => console.log("Fire!!");
  const md1 = useModalManager('modal2', () => <Cp2/>)
  const md5 = useModalManager('modal5', () => <Cp5/>)
  return (
    <>
      {/* <Cp1/> */}
      <Button onPress={() => md1.show() }><Text>Open modal</Text></Button>
      <Button onPress={() => md5.show() }><Text>Open modal5</Text></Button>
      <Button onPress={() => md1.close() }><Text>Close modal</Text></Button>
    </>
  )
}







const Component = () => {
  
  return (
    <>
      {/* Manager */}
      <ModalManager>
        <App/>
      </ModalManager>
    </>
  );
};
