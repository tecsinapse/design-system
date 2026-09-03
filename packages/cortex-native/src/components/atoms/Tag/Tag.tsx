import React, { useCallback, useRef, useState } from 'react';
import { Animated, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { colorToneBg } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';
import { IconProps } from '../Icon/Icon';
import { TagContext } from './TagContext';
import TagIcon from './TagIcon';
import Label from './Label';
import Close from './Close';

export interface TagProps extends ViewProps {
  value?: React.ReactNode;
  icon?: IconProps;
  dismiss?: boolean;
  onDismiss?: () => void;
  variant?: 'small' | 'default';
  backgroundColorTone?: ColorType;
  backgroundColorVariant?: ColorGradationType;
}

const variantClass: Record<'small' | 'default', string> = {
  small: 'rounded-micro px-mili py-nano',
  default: 'rounded-mili px-centi py-micro',
};

const TagRoot: React.FC<TagProps> = ({
  value,
  icon,
  variant = 'small',
  dismiss: canDismiss = false,
  onDismiss,
  style,
  backgroundColorTone = 'secondary',
  backgroundColorVariant = 'xlight',
  testID,
  className,
  children,
  ...rest
}) => {
  const [dismiss, setDismiss] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const duration = 300;

  const handleDismiss = useCallback(() => {
    onDismiss?.();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => setDismiss(true));
  }, [onDismiss, fadeAnim]);

  if (dismiss) {
    return null;
  }

  const tagClassName = cn(
    'flex-row justify-center items-center self-center',
    variantClass[variant],
    colorToneBg[backgroundColorTone][backgroundColorVariant],
    className,
  );

  return (
    <TagContext.Provider value={{ handleDismiss }}>
      <Animated.View
        testID={testID}
        className={tagClassName}
        style={[{ opacity: fadeAnim }, style]}
        {...rest}
      >
        {children ?? (
          <>
            {icon && <TagIcon {...icon} />}
            {typeof value === 'string' ? <Label>{value}</Label> : value}
            {canDismiss && <Close />}
          </>
        )}
      </Animated.View>
    </TagContext.Provider>
  );
};

TagRoot.displayName = 'Tag';

const Tag = Object.assign(TagRoot, {
  Root: TagRoot,
  Icon: TagIcon,
  Label,
  Close,
});

export default Tag;
