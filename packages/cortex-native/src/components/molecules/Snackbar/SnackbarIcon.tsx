import React from 'react';
import { View } from 'react-native';
import Icon, { IconProps } from '../../atoms/Icon/Icon';
import { useSnackbarContext } from './SnackbarContext';

export type SnackbarIconProps = IconProps;

const SnackbarIcon: React.FC<SnackbarIconProps> = ({
  size = 'centi',
  colorVariant,
  colorTone,
  ...rest
}) => {
  const context = useSnackbarContext();

  return (
    <View className="mr-mili">
      <Icon
        size={size}
        colorVariant={colorVariant ?? context.colorVariant}
        colorTone={colorTone ?? context.colorTone}
        {...rest}
      />
    </View>
  );
};

SnackbarIcon.displayName = 'Snackbar.Icon';

export default SnackbarIcon;
