
import React, { FC, useState } from 'react';
import { Modal as RNModal } from 'react-native';
import { createHandler } from './Handler';
import { ModalProps } from './ModalView';
export const opa = createHandler()

interface ModalManagerProps {}

export const ModalManager: FC<ModalManagerProps> = ({ children }) => {
    opa.init(useState<React.FC<ModalProps>[]>([]))
    const _render = opa.render()
    const hasModals = _render.length > 0
    return (
        <>
            {children}
            {/* <RNModal visible={hasModals} transparent animationType='none'> */}
                {_render}
            {/* </RNModal> */}
        </>
    )
}
