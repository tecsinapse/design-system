import React from 'react';
import { Menubar } from './index';
import { MostUsedItemProps } from './MostUsedItem';
import { DefaultProps } from './interface';

interface MenuItem extends DefaultProps {
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
        <Menubar.MostUsed label={labelMostUsed}>
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
        {options.map((item, index) => (
          <Menubar.Category
            key={`${item.title}-${index}`}
            title={item.title}
            options={item.items}
            render={prop => {
              const { title, items, ...rest } = prop;
              return (
                <Menubar.Item
                  key={prop.title}
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
