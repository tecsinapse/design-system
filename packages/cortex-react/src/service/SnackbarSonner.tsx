import React from 'react';
import { ExternalToast, toast } from 'sonner';
import { DefaultSnack } from '../components/Snackbar/DefaultSnack';
import { ISnackbar, TypeSnack } from './ISnackbar';
import { IExternalToast } from './IExternalToast';

export class SnackbarSonner implements ISnackbar<IExternalToast> {
  _options?: IExternalToast;

  constructor(options?: IExternalToast) {
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
    options?: Omit<IExternalToast, 'className' | 'style'>
  ) {

    return toast.custom(
      t => {
        return (
          <DefaultSnack
            text={message}
            variants={{ intent: type }}
            onDismiss={() => {
              toast.dismiss(t)
              if (options?.onDismiss && typeof options?.onDismiss === 'function') {
                options.onDismiss()
              }
            }}
          />
        );
      },
      { ...this._options, ...options }
    );
  }
}
