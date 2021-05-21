import { InputContainer, InputContainerProps, InputElementProps, useInputFocus } from "@tecsinapse/react-core";
import React, { FC } from "react";
import { StyledBorderKeeper, StyledNativeInput } from "./styled";

export interface InputNativebProps extends Omit<InputElementProps, "style">, InputContainerProps {}

export const Input: FC<InputNativebProps> = ({
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
            <InputContainer
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
                <StyledNativeInput 
                    {...rest} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </InputContainer>
        </StyledBorderKeeper>
    )
}

export default Input