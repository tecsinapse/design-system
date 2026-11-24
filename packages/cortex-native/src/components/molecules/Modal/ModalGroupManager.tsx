import React, { FC, useSyncExternalStore } from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';
import {
  createModalLifecycleHandler,
  ModalDismissContext,
} from './ModalLifecycleHandler';

export const modalLifecycle = createModalLifecycleHandler();

export const ModalGroupManager: FC<ModalProps> = ({ children, ...others }) => {
  const _render = useSyncExternalStore(
    modalLifecycle.subscribe,
    modalLifecycle.getSnapshot
  );
  const hasModals = _render.length > 0;

  return (
    <>
      {children}
      <RNModal
        transparent
        statusBarTranslucent
        animationType="none"
        visible={hasModals}
        onRequestClose={modalLifecycle.closeLastOpenedModal}
        {...others}
      >
        {_render.map(element => (
          <ModalDismissContext.Provider
            key={element.key}
            value={element.props.onClose}
          >
            {element}
          </ModalDismissContext.Provider>
        ))}
      </RNModal>
    </>
  );
};
