import { ReactElement, useCallback, useEffect, useId, useState } from "react";
import { modalLifecycle } from "./ModalGroupManager";
import { IBaseModal } from "./ui/types";

/**
 * Use this hook to tell the modal lifecycle handler that you want to add
 * a new modal component.
 *
 * @returns
 * @param modalId
 */
export const useLazyModalManager = (modalId?: string) => {
  const uid = useId();
  const [id] = useState(modalId ?? uid);

  const requestUpdate = useCallback(() => modalLifecycle.update(), []);

  const sync = useCallback(
    (modal: ReactElement<IBaseModal>) => {
      modalLifecycle.sync(id, () => modal);
      return null;
    },
    [id]
  );

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
    requestUpdate,
    sync,
    show,
    close,
  };
};
