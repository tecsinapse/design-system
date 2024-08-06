import { SnackbarVariants } from '@tecsinapse/cortex-core';
import React from 'react';
import { IoMdClose, IoMdInformationCircleOutline } from 'react-icons/io';
import { BaseSnackbar } from './BaseSnackbar';

/** Snackbar component */
export const DefaultSnack = ({
  text,
  onDismiss,
  variants,
}: {
  text: string;
  onDismiss: () => void;
  variants?: SnackbarVariants;
}) => (
  <BaseSnackbar show={true} variants={{ intent: variants?.intent }}>
    <div className={'flex justify-between items-center flex-row gap-x-mili'}>
      <IoMdInformationCircleOutline
        className={'w-[20px] h-[20px] shrink-0'}
        data-testid={'icon-info'}
      />
      <p>{text}</p>
      <IoMdClose
        data-testid={'icon-close'}
        onClick={onDismiss}
        size={24}
        className={'cursor-pointer w-[20px] h-[20px] shrink-0'}
      />
    </div>
  </BaseSnackbar>
);
