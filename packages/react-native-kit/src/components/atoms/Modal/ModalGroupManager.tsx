import React, { FC, ReactElement, useState } from 'react';
import { Modal as RNModal } from 'react-native';
import { createModalLifecycleHandler } from './ModalLifecycleHandler';
import { IBaseModal } from './ui/types';

export const modalLifecycle = createModalLifecycleHandler()

/**
 * TODO:
 * @param param0 
 * @returns 
 */
export const ModalGroupManager: FC = ({ children }) => {

    modalLifecycle.attach(useState<ReactElement<IBaseModal>[]>([]))
    const _render = modalLifecycle.render()
    const hasModals = _render.length > 0
    
    return (
        <>
            {children}
            <RNModal visible={hasModals} transparent animationType='none'>
                {_render}
            </RNModal>
        </>
    )
}
