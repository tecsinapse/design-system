import React from 'react';
import { DefaultProps } from './interface';
import Masonry from '../Masonry';

const Categories = ({ children }: DefaultProps) => {
  return <Masonry columns={4}>{children}</Masonry>;
};

export default Categories;
