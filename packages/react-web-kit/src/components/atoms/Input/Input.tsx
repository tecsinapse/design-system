import { InputProps } from '@tecsinapse/react-core'
import React, { FC } from 'react'
import { StyledInput } from './styled'

const Input: FC<InputProps> = (props) => {
    return <StyledInput {...props}/>
}

export default Input
