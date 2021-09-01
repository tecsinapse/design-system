import React, { useCallback, useState } from 'react';
import { Animated, ViewProps } from 'react-native';
import { IconProps } from '../Icon';
import { PressableSurface } from '../PressableSurface';
import { StyledCloseIcon, StyledLeftIcon, StyledTagContainer } from './styled';

export interface TagProps extends ViewProps {
  value: React.ReactNode;
  icon?: IconProps;
  dismiss?: boolean;
  onDismiss?: () => void;
  variant?: 'small' | 'default';
}

const Tag: React.FC<TagProps> = ({
  value,
  icon,
  variant = 'small',
  dismiss: canDismiss = false,
  onDismiss = () => {},
  ...rest
}): JSX.Element => {
  const [dismiss, setDismiss] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const duration = 300;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handleDismiss = useCallback(() => {
    onDismiss();
    fadeOut();
    setTimeout(() => setDismiss(true), duration);
  }, [onDismiss]);

  return (
    <StyledTagContainer
      {...rest}
      variant={variant}
      style={{ opacity: (fadeAnim as unknown) as number }}
      visible={!dismiss}
    >
      {icon && (
        <StyledLeftIcon
          size={icon.size || 'micro'}
          colorVariant={icon.colorVariant || 'primary'}
          {...icon}
        />
      )}
      {value}
      {canDismiss && (
        <PressableSurface onPress={handleDismiss}>
          <StyledCloseIcon
            name="close-outline"
            type="ionicon"
            size="centi"
            fontColor="medium"
          />
        </PressableSurface>
      )}
    </StyledTagContainer>
  );
};

export default Tag;
