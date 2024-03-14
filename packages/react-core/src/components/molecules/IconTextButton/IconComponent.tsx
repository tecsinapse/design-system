import React, { FC } from 'react';
import { Icon, IconProps } from '../../atoms/Icon';
import { ButtonSizeType } from '../../atoms/Button';
import { FontColor } from '../../../types/defaults';

interface IconComponentProps {
  iconProps?: IconProps;
  size?: ButtonSizeType;
  defaultFontColor: keyof FontColor;
}

const IconComponent: FC<IconComponentProps> = ({
  iconProps,
  size = 'default',
  defaultFontColor,
}) => {
  return iconProps ? (
    <Icon
      size={iconProps.size ?? size === 'small' ? 'deca' : 'kilo'}
      fontColor={iconProps.fontColor ?? defaultFontColor}
      {...iconProps}
    />
  ) : (
    <></>
  );
};

export default React.memo(IconComponent);
