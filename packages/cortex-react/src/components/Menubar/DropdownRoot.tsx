import React from 'react';
import Categories from './Categories';
import Category from './Category';
import Dropdown from './Dropdown';
import { DefaultProps } from './interface';
import Item from './Item';
import MostUsed from './MostUsed';
import { MostUsedItemProps } from './MostUsedItem';
import MostUsedList from './MostUsedList';
import SubItem from './SubItem';

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
    <Dropdown>
      {hasMostUsed ? (
        <MostUsed label={labelMostUsed}>
          <MostUsedList mostUsed={mostUsed} />
        </MostUsed>
      ) : (
        <></>
      )}

      <Categories>
        {options.map((item, index) => (
          <Category
            key={`${item.title}-${index}`}
            title={item.title}
            options={item.items}
            render={prop => {
              const { title, items, ...rest } = prop;
              return (
                <Item
                  key={prop.title}
                  {...rest}
                  subItems={items ?? []}
                  renderSubItems={({ title, ...rest }) => {
                    return (
                      <SubItem key={title} {...rest}>
                        {title}
                      </SubItem>
                    );
                  }}
                >
                  {title}
                </Item>
              );
            }}
          />
        ))}
      </Categories>
    </Dropdown>
  );
};

export default DropdownRoot;
