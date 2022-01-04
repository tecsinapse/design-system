import { BoxContent } from "@tecsinapse/react-core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, Keyboard, KeyboardAvoidingView, LayoutChangeEvent, Pressable } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackDropView, CloseBar, StyledPressableBackDrop } from "./styled";
import { IBaseModal } from "./types";

const BACKDROP_ALPHA = .65
const INTERPOLATION_STEPS = 10
const INTERPOLATION_DURATION = 195 //ms
const OPACITY_DURATION = 25 //ms

export const ModalView: FC<IBaseModal> = ({ 
    children,
    visible,
    BoxComponent = BoxContent,
    frozen,
    close,
    onClose
}) => {
    
    const { bottom } = useSafeAreaInsets()
    const [ ready, setReady ] = useState(false)
    const [ keyboardOpened, setKeyboardOpened ] = useState(false)
    const [ boxHeight, setBoxHeight ] = useState(0)
    const backgroundCarrier = useRef(new Animated.Value(0)).current
    const translationCarrier = useRef(new Animated.Value(0)).current
    const opacityCarrier = useRef(new Animated.Value(0)).current
    const offset = keyboardOpened ? 0 : bottom

    const show = useCallback(() => {
        Animated.sequence([
            Animated.timing(backgroundCarrier, {
                toValue: INTERPOLATION_STEPS,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: false
            }),
            Animated.timing(opacityCarrier, {
                toValue: 1,
                duration: OPACITY_DURATION,
                useNativeDriver: true
            }),
            Animated.timing(translationCarrier, {
                toValue: 0,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: true
            })
        ]).start()
    }, [])

    const hide = useCallback((to: number) => {
        Animated.sequence([
            Animated.timing(translationCarrier, {
                toValue: to,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: true
            }),
            Animated.timing(backgroundCarrier, {
                toValue: 0,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: false
            }),
            Animated.timing(opacityCarrier, {
                toValue: 0,
                duration: OPACITY_DURATION,
                useNativeDriver: true
            }),
        ]).start(onClose)
    }, [onClose])

    const backgroundInterpolation = backgroundCarrier.interpolate({
        inputRange: [0, INTERPOLATION_STEPS],
        outputRange: ['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${BACKDROP_ALPHA})`]
    })

    const handleBoxLayoutChanges = useCallback((lce: LayoutChangeEvent) => {
        let boxHeightEvent = lce.nativeEvent.layout.height
        setBoxHeight(boxHeightEvent)
        
        if (visible && !ready) {
            translationCarrier.setValue(boxHeightEvent)
            setReady(true)
        }
    }, [show, ready, visible, setReady])

    useEffect(() => {
        if (visible && ready) requestAnimationFrame(() => show())
        if (!visible && !ready) requestAnimationFrame(() => hide(boxHeight))
        if (!visible && ready) setReady(false)
    }, [ready, visible])

    useEffect(() => {
        const showEvent = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
        const hideEvent = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        return () => {
            showEvent.remove()
            hideEvent.remove()
        }
    }, [])

    return (
        <StyledPressableBackDrop onPress={!frozen ? close : undefined}>
            <BackDropView style={{ backgroundColor: backgroundInterpolation }}>
                <KeyboardAvoidingView behavior="padding">
                    <Animated.View style={{ opacity: opacityCarrier, transform: [{ translateY: translationCarrier }]}}>
                        <Pressable>
                            <BoxComponent onLayout={handleBoxLayoutChanges} style={{ paddingBottom: offset }} variant="bottom">
                                <CloseBar/>
                                {children}
                            </BoxComponent>
                        </Pressable>
                    </Animated.View>
                </KeyboardAvoidingView>
            </BackDropView>
        </StyledPressableBackDrop>
    )
}