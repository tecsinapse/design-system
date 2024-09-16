import React from 'react';
import { DefaultProps } from './types';
import Masonry from '../Masonry';

const Categories = ({ children }: DefaultProps) => {
  return <Masonry columns={4}>{children}</Masonry>;
};

export default Categories;
