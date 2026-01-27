import React from 'react';
import { ExternalToast, toast } from 'sonner';
import { DefaultSnack } from '../components/Snackbar/DefaultSnack';
import { ISnackbar, TypeSnack } from './ISnackbar';
import { IExternalToast } from './IExternalToast';

interface PromiseSnackConfig<T = unknown> {
  loading: {
    message: string;
    type?: TypeSnack;
    options?: Omit<IExternalToast, 'className' | 'style'>;
  };
  success?: {
    message?: string;
    type?: TypeSnack;
    options?: Omit<IExternalToast, 'className' | 'style'>;
  };
  error?: {
    message?: string;
    type?: TypeSnack;
    options?: Omit<IExternalToast, 'className' | 'style'>;
  };
}

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
              toast.dismiss(t);
              if (
                options?.onDismiss &&
                typeof options?.onDismiss === 'function'
              ) {
                options.onDismiss();
              }
            }}
          />
        );
      },
      { ...this._options, ...options }
    );
  }

  async promise<T>(
    promise: Promise<T>,
    config: PromiseSnackConfig<T>
  ): Promise<T> {
    const { loading, success, error } = config;

    const id = this.show(loading.type ?? 'info', loading.message, {
      ...loading.options,
      duration: loading.options?.duration ?? Infinity,
    });

    try {
      await promise;

      if (!success) {
        toast.dismiss(id);
      } else {
        const msg = success?.message ?? 'Operação concluída com sucesso.';

        this.show(success?.type ?? 'success', msg, {
          ...success?.options,
          id,
          duration:
            success?.options?.duration ?? this._options?.duration ?? 5000,
        });
      }
    } catch (err) {
      if (!error) {
        toast.dismiss(id);
      } else {
        const msg = error?.message ?? 'Ocorreu um erro inesperado.';

        this.show(error?.type ?? 'error', msg, {
          ...error?.options,
          id,
          duration: error?.options?.duration ?? this._options?.duration ?? 5000,
        });
      }
    }

    return promise;
  }
}
