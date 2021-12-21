
import React, { FC } from 'react';
import { Modal as RNModal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from '../Text';
import { ModalView } from './ModalView';

interface ModalProps {
    onBackDropPress?: () => void
}

export const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <RNModal visible={true} transparent animationType='none'>
            <SafeAreaProvider>
                {children}
            </SafeAreaProvider>
        </RNModal>
    )
}
