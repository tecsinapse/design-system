import React, { useState, useCallback } from 'react';

import { StyledTagContainer, StyledLeftIcon, StyledCloseIcon } from './styled';
import { IconProps } from '../Icon';
import { PressableSurface } from '../PressableSurface';

export interface TagProps {
    value: React.ReactNode
    icon?: IconProps
    dismiss?: boolean
    onDismiss?: () => void
    variant?: 'small' | 'default'
}

const Tag: React.FC<TagProps> = ({ value, icon, variant = 'small', dismiss: canDismiss = false, onDismiss = () => { } }): JSX.Element => {
    const [dismiss, setDismiss] = useState(false);

    const handleDismiss = useCallback(() => {
        setDismiss(true);
        onDismiss();
    }, []);

    return <>
        {!dismiss &&
            <StyledTagContainer variant={variant}>
                {icon && <StyledLeftIcon size={icon.size || "micro"} colorVariant={icon.colorVariant || 'primary'} {...icon} />}
                {value}
                {canDismiss &&
                    <PressableSurface onPress={handleDismiss}>
                        <StyledCloseIcon name="close-outline" type="ionicon" size="centi" fontColor="medium" />
                    </PressableSurface>
                }
            </StyledTagContainer>
        }
    </>;
};

export default Tag;
