import { render } from '@testing-library/react';
import { CategoriesProvider } from '../../../provider/CategoriesContext';
import React, { ReactNode } from 'react';

export const renderWithProvider = (ui: ReactNode) => {
  return render(<CategoriesProvider>{ui}</CategoriesProvider>);
};
