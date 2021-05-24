import { InputContainer, InputContainerProps, InputElementProps, StyledBorderKeeper, useInputFocus } from "@tecsinapse/react-core";
import React, { FC } from "react";
import { TextInputProps } from "react-native";
import { StyledNativeInput } from "./styled";

export interface InputNativebProps extends 
    Omit<InputElementProps, "style">, 
    InputContainerProps, 
    Omit<TextInputProps, "style" | "onBlur" | "onChange" | "onFocus"> {}

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