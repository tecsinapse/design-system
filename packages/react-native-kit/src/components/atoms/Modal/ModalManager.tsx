
import React, { FC, useState } from 'react';
import { Modal as RNModal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createHandler } from './Handler';
import { ModalProps } from './ModalView';
export const opa = createHandler()
console.log("======================---=======================")

interface ModalManagerProps {

}

export const ModalManager: FC<ModalManagerProps> = ({ children }) => {
    opa.init(useState<React.FC<ModalProps>[]>([]))
    const _render = opa.render()
    const hasModals = _render.length > 0
    console.log("R-> ModalManager", hasModals)
    
    return (
        <>
            {children}
            {/* <RNModal visible={hasModals} transparent animationType='none'> */}
                <SafeAreaProvider>
                    {_render}
                </SafeAreaProvider>
            {/* </RNModal> */}
        </>
    )
}
