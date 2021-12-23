import { BoxContent } from "@tecsinapse/react-core";
import React, { FC, useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackDropView, CloseBar, StyledPressableBackDrop } from "./styled";
import { IBaseModal } from "./types";

const BACKDROP_ALPHA = .65
const INTERPOLATION_STEPS = 10
const INTERPOLATION_DURATION = 200 //ms

export const ModalView: FC<IBaseModal> = ({ 
    children,
    BoxComponent = BoxContent,
    visible,
    close,
    onClose
}) => {
    
    const [ boxHeight, setBoxHeight ] = useState(-1)
    const backgroundCarrier = useRef(new Animated.Value(0)).current
    const translationCarrier = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (boxHeight< 0) return
        
        if (visible) {
            Animated.parallel([
                Animated.timing(backgroundCarrier, {
                    toValue: INTERPOLATION_STEPS,
                    duration: INTERPOLATION_DURATION,
                    easing: Easing.out(Easing.circle),
                    useNativeDriver: false
                }),
                Animated.timing(translationCarrier, {
                    toValue: 0,
                    duration: INTERPOLATION_DURATION,
                    easing: Easing.out(Easing.circle),
                    useNativeDriver: true
                })
            ]).start()
        }
        else {
            Animated.parallel([
                Animated.timing(backgroundCarrier, {
                    toValue: 0,
                    duration: INTERPOLATION_DURATION,
                    easing: Easing.out(Easing.circle),
                    useNativeDriver: false
                }),
                Animated.timing(translationCarrier, {
                    toValue: boxHeight,
                    duration: INTERPOLATION_DURATION,
                    easing: Easing.out(Easing.circle),
                    useNativeDriver: true
                })
            ]).start(onClose)
        }
    }, [visible, boxHeight])

    const backgroundInterpolation = backgroundCarrier.interpolate({
        inputRange: [0, 10],
        outputRange: ['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${BACKDROP_ALPHA})`]
    })

    const readBoxHeight = (e: LayoutChangeEvent) => {
        translationCarrier.setValue(e.nativeEvent.layout.height)
        setBoxHeight(e.nativeEvent.layout.height)
    }

    return (
        <StyledPressableBackDrop style={{ opacity: boxHeight< 0 ? 0 : 1 }} onPress={close}>
            <BackDropView style={{ backgroundColor: backgroundInterpolation }}>
                <Animated.View onLayout={readBoxHeight} style={{ transform: [{ translateY: translationCarrier }]}}>
                    <Pressable>
                        <BoxComponent variant="bottom">
                            <SafeAreaView edges={['bottom']}>
                                <CloseBar/>
                                {children}
                            </SafeAreaView>
                        </BoxComponent>
                    </Pressable>
                </Animated.View>
            </BackDropView>
        </StyledPressableBackDrop>
    )
}