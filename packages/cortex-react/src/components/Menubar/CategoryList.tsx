import React from 'react';
import { Menubar } from './index';
import { DropdownRootProps } from './DropdownRoot';

const CategoryList = ({ options }: Pick<DropdownRootProps, 'options'>) => {
  return (
    <>
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
    </>
  );
};

export default CategoryList;
