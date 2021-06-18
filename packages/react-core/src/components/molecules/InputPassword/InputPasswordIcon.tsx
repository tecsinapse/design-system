import React, { FC } from 'react';
import { ButtonProps } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { StyledPasswordButtonIcon } from './styled';

interface InputPasswordIconProps extends ButtonProps {
    revealed: boolean
    onChangeState: (revealed: boolean) => void
}

const InputPasswordIcon: FC<InputPasswordIconProps> = ({ revealed, onChangeState, ...rest }) => {
    const icon = revealed ? 'eye-outline' : 'eye-off-outline'
    return (
        <StyledPasswordButtonIcon
            {...rest}
            variant="text" 
            size="small" 
            onPress={() => onChangeState(!revealed)}>
            <Icon name={icon} type="ionicon" size="centi"/>
        </StyledPasswordButtonIcon>
    )
}

export default InputPasswordIcon
