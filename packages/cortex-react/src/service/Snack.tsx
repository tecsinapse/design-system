import { ExternalToast, toast } from 'sonner';
import React, { ReactElement } from 'react';
import { DefaultSnack } from '../components';

export class Snack {
  custom(Component: ReactElement, props?: ExternalToast) {
    return toast.custom(() => Component, {
      ...props,
      duration: props?.duration ?? 5000,
    });
  }

  default(text: string, props?: ExternalToast) {
    return toast.custom(
      t => <DefaultSnack text={text} variants={{ intent: 'primary' }} t={t} />,
      { ...props, duration: props?.duration ?? 5000 }
    );
  }

  success(text: string, props?: ExternalToast) {
    return toast.custom(
      t => (
        <DefaultSnack
          text={text}
          variants={{ intent: 'success', className: props?.className }}
          t={t}
        />
      ),
      { ...props, duration: props?.duration ?? 5000 }
    );
  }

  error(text: string, props?: ExternalToast) {
    return toast.custom(
      t => <DefaultSnack text={text} variants={{ intent: 'error' }} t={t} />,
      { ...props, duration: props?.duration ?? 5000 }
    );
  }

  warning(text: string, props?: ExternalToast) {
    return toast.custom(
      t => <DefaultSnack text={text} variants={{ intent: 'warning' }} t={t} />,
      { ...props, duration: props?.duration ?? 5000 }
    );
  }

  info(text: string, props?: ExternalToast) {
    return toast.custom(
      t => <DefaultSnack text={text} variants={{ intent: 'info' }} t={t} />,
      { ...props, duration: props?.duration ?? 5000 }
    );
  }
}
