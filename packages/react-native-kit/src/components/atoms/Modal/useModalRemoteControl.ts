import { useCallback } from 'react';
import { modalLifecycle } from './ModalGroupManager';

/**
 * Use it to control a specific modal wherever it's.
 * Just provide an id of a specific instance.
 *
 * @param modalId
 * @returns
 */
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
