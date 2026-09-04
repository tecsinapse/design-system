import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Button from '../../../atoms/Button/Button';

export interface SelectConfirmProps extends ViewProps {
  handleConfirm: () => void;
  confirmButtonText?: string;
  loading?: boolean;
}

const Confirm = ({
  className,
  handleConfirm,
  confirmButtonText,
  loading,
  ...rest
}: SelectConfirmProps): React.ReactElement => (
  <View {...rest} className={cn('w-full px-deca py-centi', className)}>
    <Button
      variant="filled"
      intent="primary"
      title={confirmButtonText ?? 'Confirm'}
      onPress={handleConfirm}
      disabled={loading}
    />
  </View>
);

Confirm.displayName = 'Select.Confirm';

export default Confirm;
