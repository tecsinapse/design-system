import React, { FC, ReactElement, useState } from 'react';
import { ModalProps, Modal as RNModal } from 'react-native';
import { createModalLifecycleHandler } from './ModalLifecycleHandler';
import { IBaseModal } from './ui/types';

export const modalLifecycle = createModalLifecycleHandler();

/**
 * It's responsable for rendering all the modal components.
 *
 * @param param0
 * @returns
 */
export const ModalGroupManager: FC<ModalProps> = ({ children, ...others }) => {
  modalLifecycle.attach(useState<ReactElement<IBaseModal>[]>([]));
  const _render = modalLifecycle.render();
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
        {_render}
      </RNModal>
    </>
  );
};
