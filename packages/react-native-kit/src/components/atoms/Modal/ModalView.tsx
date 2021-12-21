import { BoxContent } from "@tecsinapse/react-core";
import React, { FC } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackDropView, CloseBar } from "./styled";


interface ModalProps {
    BoxComponent?: React.FC
    onBackDropPress?: () => void
}

export const ModalView: FC<ModalProps> = ({ 
    children,
    BoxComponent = BoxContent
}) => {
    return (
        <BackDropView onPress={() => console.log("há")}>
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