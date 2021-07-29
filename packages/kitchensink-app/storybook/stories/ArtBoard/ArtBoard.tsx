import React, { FC } from 'react';
import { StyledBoard } from './style';

export interface ArtBoardProps {
  backgroundColor?: string
}

export const ArtBoard: FC<ArtBoardProps> = ({ children, backgroundColor }) => {
  return <StyledBoard backgroundColor={backgroundColor}>{children}</StyledBoard>;
};
