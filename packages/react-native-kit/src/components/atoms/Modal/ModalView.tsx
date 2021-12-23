import { BoxContent } from "@tecsinapse/react-core";
import React, { FC, useEffect, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackDropView, CloseBar } from "./styled";


export interface ModalProps {
    visible?: boolean
    BoxComponent?: React.FC
    close?: () => void // injected by hook
    onClose?: () => void
}

export const ModalView: FC<ModalProps> = ({ 
    children,
    BoxComponent = BoxContent,
    visible,
    close,
    onClose
}) => {
    
    const rowTranslation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(rowTranslation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            isInteraction: true,
            useNativeDriver: true
        }).start(() => { !visible && onClose?.() })
    }, [visible])

    return (
        <BackDropView onPress={close}>
            <Pressable>
                <BoxComponent variant="bottom">
                    <SafeAreaView edges={['bottom']}>
                        <CloseBar/>
                        {children}
                    </SafeAreaView>
                </BoxComponent>
            </Pressable>
        </BackDropView>
    )
}