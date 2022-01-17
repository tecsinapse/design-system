import {
    DateTimePicker as DateTimePickerCore,
    DateTimePickerProps
} from '@tecsinapse/react-core';
import React, { FC, useCallback, useState } from 'react';
import { Modal } from './Modal';

export const DateTimePicker: FC<DateTimePickerProps> = ({ ...rest }) => {

    const [ visible, setVisible ] = useState(false)
    const show = useCallback(() => setVisible(true), [])
    const close = useCallback(() => setVisible(false), [])

    return (
        <DateTimePickerCore
            {...rest}
            requestShowSelector={show}
            requestCloseSelector={close}
            renderSelector={(selector) => (
                <Modal animationType='fade' visible={visible} onRequestClose={close}>
                    {selector}
                </Modal>
            )}
        />
    );
};
