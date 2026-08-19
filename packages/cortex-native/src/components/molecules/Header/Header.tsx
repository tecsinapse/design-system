import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import Badge from '../../atoms/Badge/Badge';
import Icon, { IconProps } from '../../atoms/Icon/Icon';
import { ButtonVariants, buttonStyles } from '../../../styles/button';

export type Attachable = ButtonVariants & {
  icon: IconProps;
  valueBadge?: number;
  onPress?: () => void;
};

export interface HeaderProps extends ViewProps {
  rightButton?: Attachable;
  leftButton?: Attachable;
}

export interface ButtonBaseProps extends ViewProps {
  button?: Attachable;
}

const FloatingButton: React.FC<Attachable> = ({
  icon,
  onPress,
  intent = 'primary',
  variant = 'filled',
  size = 'small',
}) => (
  <Pressable
    onPress={onPress}
    className={buttonStyles({ intent, variant, size })}
    style={{ aspectRatio: 1, height: 49, alignItems: 'center', justifyContent: 'center' }}
  >
    {icon ? <Icon {...icon} /> : null}
  </Pressable>
);

const DummyButton: React.FC = () => (
  <Pressable
    disabled
    className="bg-transparent"
    style={{ aspectRatio: 1, height: 49 }}
  />
);

const Header: React.FC<HeaderProps> = ({
  rightButton,
  leftButton,
  children,
  style,
  ...rest
}) => {
  const ButtonBase: React.FC<ButtonBaseProps> = ({ button }) =>
    button ? <FloatingButton {...button} /> : null;

  return (
    <View
      {...rest}
      className="flex-row justify-between items-center px-deca w-full"
      style={style}
    >
      {leftButton ? (
        leftButton?.valueBadge ? (
          <Badge value={leftButton.valueBadge} color="error">
            <ButtonBase button={leftButton} />
          </Badge>
        ) : (
          <ButtonBase button={leftButton} />
        )
      ) : (
        <DummyButton />
      )}
      {children}
      {rightButton ? (
        rightButton?.valueBadge ? (
          <Badge value={rightButton.valueBadge} color="error">
            <ButtonBase button={rightButton} />
          </Badge>
        ) : (
          <ButtonBase button={rightButton} />
        )
      ) : (
        <DummyButton />
      )}
    </View>
  );
};

export default Header;
