import { ColorType, FontColorType, FontStackType, FontWeightType, InputElementProps, Text, TypographyVariationType } from "@tecsinapse/react-core";
import React, { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyledInputContainer, StyledLabelContainer } from "../styled";

export interface InputContainerProps {
    label?: string
    labelColor?: FontColorType
    labelTypografy?: TypographyVariationType
    labelStack?: FontStackType
    labelWeight?: FontWeightType
    leftComponent?: JSX.Element
    rightComponent?: JSX.Element
    style?: StyleProp<ViewStyle>
    focused?: boolean
    color?: ColorType
}

const InputContainer: FC<InputContainerProps & Partial<InputElementProps>> = ({
    label,
    labelColor = 'medium',
    labelTypografy = 'label',
    labelStack = 'default',
    labelWeight = 'bold',
    leftComponent,
    rightComponent,
    color,
    focused,
    style,
    children
  }): JSX.Element => {
    
    return (
      <StyledInputContainer
        color={color} 
        focused={focused}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        style={style}>
        { leftComponent }

        <StyledLabelContainer>
          { label && <Text
            color={labelColor}
            typography={labelTypografy}
            fontWeight={labelWeight}
            fontStack={labelStack}
          >
            {label}
          </Text>}
          { children }
        </StyledLabelContainer>

        { rightComponent }
      </StyledInputContainer>
    );
  };
  
  export default InputContainer;
  
  
  