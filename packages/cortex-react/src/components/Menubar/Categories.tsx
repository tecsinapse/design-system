import React from 'react';
import { DefaultProps } from './types';
import Masonry from '../Masonry';
import { useDimensions } from '../../hooks';

const Categories = ({ children }: DefaultProps) => {
  const { width } = useDimensions();
  return <Masonry columns={width < 640 ? 2 : 4}>{children}</Masonry>;
};

export default Categories;
