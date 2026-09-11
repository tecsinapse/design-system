import React from 'react';
import { Text } from 'react-native';
import { act, fireEvent, render } from '@testing-library/react-native';
import { ModalGroupManager } from './ModalGroupManager';
import { useModalManager } from './useModalManager';
import { ModalView } from './ui/BaseModalView';

jest.mock('uniwind', () => ({
  useCSSVariable: () => '#353231',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const MyModal = ({ close }: { close?: () => void }) => (
  <ModalView close={close}>
    <Text>MODAL CONTENT</Text>
  </ModalView>
);

const Opener = () => {
  const modal = useModalManager(() => <MyModal />);
  return <Text onPress={() => modal.show()}>OPEN</Text>;
};

it('opens the modal when show is called', async () => {
  const { getByText, queryByText } = render(
    <ModalGroupManager>
      <Opener />
    </ModalGroupManager>
  );

  expect(queryByText('MODAL CONTENT')).toBeNull();

  fireEvent.press(getByText('OPEN'));
  await act(async () => {});

  expect(queryByText('MODAL CONTENT')).toBeTruthy();
});
