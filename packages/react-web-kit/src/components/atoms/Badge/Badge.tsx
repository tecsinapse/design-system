import { BadgeProps } from '@tecsinapse/react-core'
import React, { FC } from 'react'
import { BadgeStyle } from './styled'

const Badge: FC<BadgeProps> = (props) => {
    return <BadgeStyle {...props}/>
}

export default Badge
