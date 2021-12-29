import { BoxContent } from "@tecsinapse/react-core";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackDropView, CloseBar, StyledPressableBackDrop } from "./styled";
import { IBaseModal } from "./types";

const BACKDROP_ALPHA = .65
const INTERPOLATION_STEPS = 10
const INTERPOLATION_DURATION = 195 //ms

export const ModalView: FC<IBaseModal> = ({ 
    children,
    visible,
    BoxComponent = BoxContent,
    close,
    onClose
}) => {
    
    const { bottom } = useSafeAreaInsets()
    const { height } = useWindowDimensions()
    const backgroundCarrier = useRef(new Animated.Value(0)).current
    const translationCarrier = useRef(new Animated.Value(0)).current

    const show = useCallback((to: number) => {
        Animated.sequence([
            Animated.timing(backgroundCarrier, {
                toValue: INTERPOLATION_STEPS,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: false
            }),
            Animated.timing(translationCarrier, {
                toValue: to,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: true
            })
        ]).start()
    }, [])

    const hide = useCallback(() => {
        Animated.sequence([
            Animated.timing(translationCarrier, {
                toValue: 0,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: true
            }),
            Animated.timing(backgroundCarrier, {
                toValue: 0,
                duration: INTERPOLATION_DURATION,
                easing: Easing.out(Easing.circle),
                useNativeDriver: false
            })
        ]).start(onClose)
    }, [onClose])

    const backgroundInterpolation = backgroundCarrier.interpolate({
        inputRange: [0, INTERPOLATION_STEPS],
        outputRange: ['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${BACKDROP_ALPHA})`]
    })

    const handleBoxLayoutChanges = useCallback((lce: LayoutChangeEvent) => {
        let boxHeight = lce.nativeEvent.layout.height
        boxHeight > 0 && show(-(boxHeight + bottom))
    }, [show])

    useEffect(() => {
        if (!visible) {
            hide()
        }
    }, [visible])

    return (
        <StyledPressableBackDrop onPress={close}>
            <BackDropView height={height} style={{ backgroundColor: backgroundInterpolation }}/>
                <Animated.View style={{ transform: [{ translateY: translationCarrier }]}}>
                    <Pressable>
                        <BoxComponent onLayout={handleBoxLayoutChanges} style={{ paddingBottom: bottom }} variant="bottom">
                            <CloseBar/>
                            {children}
                        </BoxComponent>
                    </Pressable>
                </Animated.View>
        </StyledPressableBackDrop>
    )
}