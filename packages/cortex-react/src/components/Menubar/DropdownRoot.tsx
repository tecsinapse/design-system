import React from 'react';
import { Menubar } from './index';
import { MostUsedItemProps } from './MostUsedItem';
import { DefaultProps } from './interface';
import MostUsedList from './MostUsedList';
import CategoryList from './CategoryList';

interface MenuItem extends DefaultProps {
  title: string;
  items?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface DropdownRootProps {
  labelMostUsed?: string;
  mostUsed?: MostUsedItemProps[];
  options: MenuCategory[];
}

const DropdownRoot = ({
  mostUsed,
  options,
  labelMostUsed,
}: DropdownRootProps) => {
  const hasMostUsed = mostUsed && (mostUsed ?? []).length > 0;

  return (
    <Menubar.Dropdown>
      {hasMostUsed ? (
        <Menubar.MostUsed label={labelMostUsed}>
          <MostUsedList mostUsed={mostUsed} />
        </Menubar.MostUsed>
      ) : (
        <></>
      )}

      <Menubar.Categories>
        <CategoryList options={options} />
      </Menubar.Categories>
    </Menubar.Dropdown>
  );
};

export default DropdownRoot;
