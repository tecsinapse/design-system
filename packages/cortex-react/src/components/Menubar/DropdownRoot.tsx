import React from 'react';
import Categories from './Categories';
import Category from './Category';
import Dropdown from './Dropdown';
import Item from './Item';
import MostUsed from './MostUsed';
import MostUsedList from './MostUsedList';
import SubItem from './SubItem';
import { DropdownRootProps } from './types';

/**
 * The options of DropdownRoot should be used with href, if you need use other components like <Link> from 'react-router-dom', see example in Custom Menubar.
 */
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
                  parentCategoryTitle={item.title}
                  title={title}
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
