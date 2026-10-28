import { useCallback } from 'react';
import { modalLifecycle } from './ModalGroupManager';

export const useModalRemoteControl = (modalId: string) => {
  const show = useCallback(() => {
    modalLifecycle.show(modalId);
  }, [modalId]);

  const close = useCallback(() => {
    modalLifecycle.close(modalId);
  }, [modalId]);

  return {
    show,
    close,
  };
};
