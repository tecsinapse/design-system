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
  jest.useFakeTimers();
  const { getByText, queryByText, unmount } = render(
    <ModalGroupManager>
      <Opener />
    </ModalGroupManager>
  );

  expect(queryByText('MODAL CONTENT')).toBeNull();

  fireEvent.press(getByText('OPEN'));
  await act(async () => {});

  expect(queryByText('MODAL CONTENT')).toBeTruthy();
  act(() => jest.advanceTimersByTime(250));
  unmount();
  jest.useRealTimers();
});

it('does not finish closing a modal reopened during its close animation', () => {
  jest.useFakeTimers();
  const onClose = jest.fn();
  const { rerender, unmount } = render(
    <ModalView visible onClose={onClose}>
      <Text>MODAL CONTENT</Text>
    </ModalView>
  );

  act(() => jest.advanceTimersByTime(250));
  rerender(
    <ModalView visible={false} onClose={onClose}>
      <Text>MODAL CONTENT</Text>
    </ModalView>
  );
  act(() => jest.advanceTimersByTime(50));
  rerender(
    <ModalView visible onClose={onClose}>
      <Text>MODAL CONTENT</Text>
    </ModalView>
  );
  act(() => jest.advanceTimersByTime(300));

  expect(onClose).not.toHaveBeenCalled();
  rerender(
    <ModalView visible={false} onClose={onClose}>
      <Text>MODAL CONTENT</Text>
    </ModalView>
  );
  act(() => jest.advanceTimersByTime(300));
  expect(onClose).toHaveBeenCalledTimes(1);
  unmount();
  jest.useRealTimers();
});
