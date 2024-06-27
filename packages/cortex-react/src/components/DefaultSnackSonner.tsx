import React from 'react';
import { SnackbarVariants } from '@tecsinapse/cortex-core';
import { BaseSnackbar } from './BaseSnackbar';
import { IoMdInformationCircleOutline, IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';

export const DefaultSnackSonner = ({
  t,
  text,
  variants,
}: {
  t: string | number;
  text: string;
  variants?: SnackbarVariants;
}) => (
  <BaseSnackbar show={true} variants={{ intent: variants?.intent }}>
    <div className={'flex justify-between items-center flex-row gap-x-mili'}>
      <IoMdInformationCircleOutline className={'w-[20px] h-[20px] shrink-0'} />
      <p>{text}</p>
      <IoMdClose
        onClick={() => toast.dismiss(t)}
        size={24}
        className={'cursor-pointer w-[20px] h-[20px] shrink-0'}
      />
    </div>
  </BaseSnackbar>
);
