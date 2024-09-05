import React from 'react';
import { ExternalToast, toast } from 'sonner';
import { DefaultSnack } from '../components/Snackbar/DefaultSnack';
import { ISnackbar, TypeSnack } from './ISnackbar';

export class SnackbarSonner implements ISnackbar<ExternalToast> {
  _options?: ExternalToast;

  constructor(options?: ExternalToast) {
    this._options = { ...options, duration: options?.duration ?? 5000 };
  }

  custom(Component: React.ReactElement, options?: ExternalToast) {
    return toast.custom(() => Component, {
      ...this._options,
      ...options,
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
      { ...this._options, ...options }
    );
  }
}
