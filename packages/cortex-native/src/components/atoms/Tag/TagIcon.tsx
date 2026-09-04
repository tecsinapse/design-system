import React from 'react';
import { View } from 'react-native';
import Icon, { IconProps } from '../Icon/Icon';

export type TagIconProps = IconProps;

const TagIcon: React.FC<TagIconProps> = ({ size = 'micro', colorVariant = 'primary', ...rest }) => (
  <View className="mr-micro">
    <Icon size={size} colorVariant={colorVariant} {...rest} />
  </View>
);

TagIcon.displayName = 'Tag.Icon';

export default TagIcon;
