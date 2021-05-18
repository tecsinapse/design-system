import React, { FC } from 'react'
import { StyledBoard } from './style'

export const ArtBoard: FC = ({ children }) => {
    return (
        <StyledBoard>
            { children }
        </StyledBoard>
    )
}