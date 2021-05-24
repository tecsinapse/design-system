import { InputContainerProps, InputElementProps, StyledBorderKeeper, useInputFocus } from "@tecsinapse/react-core";
import React, { FC } from "react";
import { StyledWebInputContainer, StyledWebTextInput } from "./styled";

export interface InputWebProps extends Omit<InputElementProps, "style">, InputContainerProps {}

export const Input: FC<InputWebProps> = ({
    label,
    labelColor,
    labelTypografy,
    labelStack,
    labelWeight,
    leftComponent,
    rightComponent,
    style,
    color,
    onFocus,
    onBlur,
    ...rest
}) => {
    
    const { 
        focused, 
        handleBlur, 
        handleFocus 
    } = useInputFocus(onFocus, onBlur)

    return (
        <StyledBorderKeeper focused={focused}>
            <StyledWebInputContainer
                label={label}
                labelColor={labelColor}
                labelTypografy={labelTypografy}
                labelStack={labelStack}
                labelWeight={labelWeight}
                leftComponent={leftComponent}
                rightComponent={rightComponent}
                style={style}
                color={color}
                focused={focused}>
                <StyledWebTextInput 
                    {...rest} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </StyledWebInputContainer>
        </StyledBorderKeeper>
    )
}

export default Input