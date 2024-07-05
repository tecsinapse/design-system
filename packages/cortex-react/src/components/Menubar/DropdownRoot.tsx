import React, { HTMLAttributes } from 'react';
import { Menubar } from './index';
import { MostUsedItemProps } from './MostUsedItem';

interface MenuItem extends HTMLAttributes<HTMLDivElement> {
  title: string;
  items?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface DropdownRootProps {
  labelMostUsed?: string;
  mostUsed?: MostUsedItemProps[];
  options: MenuCategory[];
}

const DropdownRoot = ({
  mostUsed,
  options,
  labelMostUsed,
}: DropdownRootProps) => {
  return (
    <Menubar.Dropdown>
      {mostUsed && (mostUsed ?? []).length > 0 ? (
        <Menubar.MostUsed label={labelMostUsed} options={mostUsed ?? []}>
          {mostUsed.map((item, index) => {
            const { title, category, ...rest } = item;
            if (index > 3) return <></>;
            return (
              <Menubar.MostUsedItem
                key={title}
                title={title}
                category={category}
                {...rest}
              />
            );
          })}
        </Menubar.MostUsed>
      ) : (
        <></>
      )}

      <Menubar.Categories>
        {options.map(item => (
          <Menubar.Category
            key={item.title}
            title={item.title}
            options={item.items}
            render={prop => {
              const { title, items, ...rest } = prop;
              return (
                <Menubar.Item
                  {...rest}
                  subItems={items ?? []}
                  renderSubItems={({ title, ...rest }) => {
                    return (
                      <Menubar.SubItem key={title} {...rest}>
                        {title}
                      </Menubar.SubItem>
                    );
                  }}
                >
                  {title}
                </Menubar.Item>
              );
            }}
          />
        ))}
      </Menubar.Categories>
    </Menubar.Dropdown>
  );
};

export default DropdownRoot;
