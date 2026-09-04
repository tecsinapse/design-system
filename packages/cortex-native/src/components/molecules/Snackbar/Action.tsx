import React from 'react';
import { Pressable } from 'react-native';
import Icon, { IconProps } from '../../atoms/Icon/Icon';
import { useSnackbarContext } from './SnackbarContext';

export type SnackbarActionProps = Omit<IconProps, 'name' | 'type'>;

const Action: React.FC<SnackbarActionProps> = ({
  size = 'centi',
  colorVariant,
  colorTone,
  onPress,
  ...rest
}) => {
  const {
    onDismiss,
    colorVariant: contextColorVariant,
    iconColorTone: contextIconColorTone,
  } = useSnackbarContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress ?? onDismiss}
      className="ml-mili"
    >
      <Icon
        {...rest}
        size={size}
        colorVariant={colorVariant ?? contextColorVariant}
        colorTone={colorTone ?? contextIconColorTone}
        name="close"
        type="material-community"
      />
    </Pressable>
  );
};

Action.displayName = 'Snackbar.Action';

export default Action;
