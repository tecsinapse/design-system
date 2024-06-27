import { ExternalToast, toast } from 'sonner';
import React from 'react';
import { DefaultSnackSonner } from '../components';
import { ISnackbar, TypeSnack } from './ISnackbar';

export class Snackbar implements ISnackbar<ExternalToast> {
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
          <DefaultSnackSonner
            text={message}
            variants={{ intent: type }}
            t={t}
          />
        );
      },
      { ...options, duration: options?.duration ?? 5000 }
    );
  }
}
