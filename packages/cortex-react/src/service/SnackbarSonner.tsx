import { ExternalToast, toast } from 'sonner';
import React from 'react';
import { DefaultSnack } from '../components';
import { ISnackbar, TypeSnack } from './ISnackbar';

export class SnackbarSonner implements ISnackbar<ExternalToast> {
  custom(Component: React.ReactElement, options?: ExternalToast) {
    return toast.custom(() => Component, {
      ...options,
      duration: options?.duration ?? 5000,
    });
  }

  show(
    type: TypeSnack,
    message: string,
    options?: Omit<ExternalToast, 'className' | 'style'>
  ) {
    return toast.custom(
      t => {
        return (
          <DefaultSnack
            text={message}
            variants={{ intent: type }}
            onDismiss={() => toast.dismiss(t)}
          />
        );
      },
      { ...options, duration: options?.duration ?? 5000 }
    );
  }
}
