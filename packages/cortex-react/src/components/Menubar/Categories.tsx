import React from 'react';
import { DefaultProps } from './types';
import Masonry from '../Masonry';
import { useDimensions } from '../../hooks';
import { CategoriesProvider } from '../../provider/CategoriesContext';

const Categories = ({ children }: DefaultProps) => {
  const { width } = useDimensions();
  return (
    <CategoriesProvider>
      <Masonry columns={width <= 640 ? 2 : 4}>{children}</Masonry>
    </CategoriesProvider>
  );
};

export default Categories;
