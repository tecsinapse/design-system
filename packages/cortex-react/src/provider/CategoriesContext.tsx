import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ExpandedMenusState {
  [categoryId: string]: string | null;
}

interface CategoriesContextProps {
  expandedMenus: ExpandedMenusState;
  toggleSubmenu: (categoryId: string, submenuId: string) => void;
}

const CategoriesContext = createContext<CategoriesContextProps | null>(null);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenusState>({});

  const toggleSubmenu = (categoryId: string, submenuId: string) => {
    setExpandedMenus(prev => {
      return {
        ...prev,
        [categoryId]: prev[categoryId] === submenuId ? null : submenuId,
      };
    });
  };

  return (
    <CategoriesContext.Provider value={{ expandedMenus, toggleSubmenu }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextProps => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoriesProvider');
  }
  return context;
};
