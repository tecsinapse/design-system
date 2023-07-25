import { ReactElement, useCallback, useEffect, useId, useState } from 'react';
import { modalLifecycle } from './ModalGroupManager';
import { IBaseModal } from './ui/types';

/**
 * Use this hook to tell the modal lifecycle handler that you want to add
 * a new modal component.
 *
 * @param modal
 * @param modalId
 * @returns
 */
export const useModalManager = (
  modal: () => ReactElement<IBaseModal>,
  modalId?: string
) => {
  const uid = useId();
  const [id] = useState(modalId ?? uid);
  modalLifecycle.sync(id, modal);

  const show = useCallback(() => {
    modalLifecycle.show(id);
  }, [id]);

  const close = useCallback(() => {
    modalLifecycle.close(id);
  }, [id]);

  useEffect(() => {
    return () => modalLifecycle.destroy(id);
  }, []);

  return {
    show,
    close,
  };
};
