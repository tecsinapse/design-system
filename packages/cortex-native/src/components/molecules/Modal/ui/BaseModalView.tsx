import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BoxContent from '../../../atoms/BoxContent/BoxContent';
import { IBaseModal } from './types';

const BACKDROP_COLOR = 'rgba(0, 0, 0, 0.5)';
const INTERPOLATION_DURATION = 195; //ms

export const ModalView: FC<IBaseModal> = ({
  children,
  visible,
  BoxComponent = BoxContent,
  frozen,
  isLastShown,
  isRaiseKeyboard = true,
  showCloseBar = true,
  close,
  onClose,
}) => {
  const { bottom } = useSafeAreaInsets();
  const [keyboardOpened, setKeyboardOpened] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const backgroundCarrier = useRef(new Animated.Value(0)).current;
  const translationCarrier = useRef(new Animated.Value(0)).current;
  const offset = isLastShown && keyboardOpened > 0 ? 0 : bottom;

  const getKeyboardHeight = (keyboard: number) => {
    if (keyboard === 0) return 0;

    const wHeight = Math.ceil(Dimensions.get('window').height);
    const sHeight = Math.ceil(Dimensions.get('screen').height);
    if (wHeight !== sHeight) {
      return keyboard + (sHeight - wHeight - (StatusBar.currentHeight || 0));
    }
    return keyboard;
  };

  const show = useCallback(() => {
    Animated.timing(backgroundCarrier, {
      toValue: 1,
      duration: INTERPOLATION_DURATION,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, []);

  const hide = useCallback(
    (to: number) => {
      Animated.parallel([
        Animated.timing(translationCarrier, {
          toValue: to,
          duration: INTERPOLATION_DURATION,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
        Animated.timing(backgroundCarrier, {
          toValue: 0,
          duration: INTERPOLATION_DURATION,
          easing: Easing.out(Easing.circle),
          useNativeDriver: false,
        }),
      ]).start(onClose);
    },
    [onClose]
  );

  const handleBoxLayoutChanges = useCallback((lce: LayoutChangeEvent) => {
    setBoxHeight(lce.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    if (visible) {
      show();
    } else {
      Keyboard.dismiss();
      hide(boxHeight);
    }
  }, [visible]);

  useEffect(() => {
    const showEvent = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardOpened(e.endCoordinates.height)
    );
    const hideEvent = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardOpened(0)
    );
    return () => {
      showEvent.remove();
      hideEvent.remove();
    };
  }, []);

  return (
    <Pressable
      style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
      onPress={!frozen ? close : undefined}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: BACKDROP_COLOR,
          opacity: backgroundCarrier,
        }}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={{
            ...(isLastShown &&
              isRaiseKeyboard && {
                paddingBottom: getKeyboardHeight(keyboardOpened),
              }),
            transform: [{ translateY: translationCarrier }],
          }}
        >
          <Pressable>
            <BoxComponent
              onLayout={handleBoxLayoutChanges}
              style={{ paddingBottom: offset }}
              variant="bottom"
            >
              {showCloseBar ? (
                <View
                  className="bg-secondary-light"
                  style={{
                    width: 42,
                    height: 5,
                    borderRadius: 10,
                    marginVertical: 5,
                    alignSelf: 'center',
                  }}
                />
              ) : null}
              {children}
            </BoxComponent>
          </Pressable>
        </Animated.View>
      </View>
    </Pressable>
  );
};
