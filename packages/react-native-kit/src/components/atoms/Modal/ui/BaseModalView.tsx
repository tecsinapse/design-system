import { BoxContent } from '@tecsinapse/react-core';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackDropView, CloseBar, StyledPressableBackDrop } from './styled';
import { IBaseModal } from './types';

const BACKDROP_ALPHA = 0.65;
const INTERPOLATION_STEPS = 10;
const INTERPOLATION_DURATION = 195; //ms
const OPACITY_DURATION = 25; //ms

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
  const [ready, setReady] = useState(false);
  const [keyboardOpened, setKeyboardOpened] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const backgroundCarrier = useRef(new Animated.Value(0)).current;
  const translationCarrier = useRef(new Animated.Value(0)).current;
  const opacityCarrier = useRef(new Animated.Value(0)).current;
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
    Animated.sequence([
      Animated.timing(backgroundCarrier, {
        toValue: INTERPOLATION_STEPS,
        duration: INTERPOLATION_DURATION,
        easing: Easing.out(Easing.circle),
        useNativeDriver: false,
      }),
      Animated.timing(opacityCarrier, {
        toValue: 1,
        duration: OPACITY_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translationCarrier, {
        toValue: 0,
        duration: INTERPOLATION_DURATION,
        easing: Easing.out(Easing.circle),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hide = useCallback(
    (to: number) => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translationCarrier, {
            toValue: to,
            duration: INTERPOLATION_DURATION,
            easing: Easing.out(Easing.circle),
            useNativeDriver: true,
          }),
          Animated.timing(opacityCarrier, {
            toValue: 0,
            duration: INTERPOLATION_DURATION,
            useNativeDriver: true,
          }),
        ]),
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

  const backgroundInterpolation = backgroundCarrier.interpolate({
    inputRange: [0, INTERPOLATION_STEPS],
    outputRange: ['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${BACKDROP_ALPHA})`],
  });

  const handleBoxLayoutChanges = useCallback(
    (lce: LayoutChangeEvent) => {
      const boxHeightEvent = lce.nativeEvent.layout.height;
      setBoxHeight(boxHeightEvent);

      if (visible && !ready) {
        translationCarrier.setValue(boxHeightEvent);
        setReady(true);
      }
    },
    [show, ready, visible, setReady]
  );

  useEffect(() => {
    if (visible && ready) requestAnimationFrame(() => show());
    if (!visible && !ready) {
      Keyboard.dismiss();
      requestAnimationFrame(() => hide(boxHeight));
    }
    if (!visible && ready) setReady(false);
  }, [ready, visible]);

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
    <StyledPressableBackDrop onPress={!frozen ? close : undefined}>
      <BackDropView style={{ backgroundColor: backgroundInterpolation }}>
        <Animated.View
          style={{
            ...(isLastShown && isRaiseKeyboard && {
            paddingBottom: getKeyboardHeight(keyboardOpened) }),
            opacity: opacityCarrier,
            transform: [{ translateY: translationCarrier }],
          }}
        >
          <Pressable>
            <BoxComponent
              onLayout={handleBoxLayoutChanges}
              style={{ paddingBottom: offset }}
              variant="bottom"
            >
              {showCloseBar && <CloseBar />}
              {children}
            </BoxComponent>
          </Pressable>
        </Animated.View>
      </BackDropView>
    </StyledPressableBackDrop>
  );
};
