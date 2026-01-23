import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Avatar, Menubar, Tag, Tooltip } from '../src';
import DropdownRoot from '../src/components/Menubar/DropdownRoot';
import { EXAMPLE_MENU, MOST_USED } from './menuBarMocks';

export default {
  title: 'Cortex/Menubar',
  component: Menubar.Root,
  subcomponents: {
    Header: Menubar.Header,
    HeaderLeft: Menubar.HeaderLeft,
    HeaderRight: Menubar.HeaderRight,
    Search: Menubar.Search,
    DropdownRoot: Menubar.DropdownRoot,
    Dropdown: Menubar.Dropdown,
    Categories: Menubar.Categories,
    Category: Menubar.Category,
    Item: Menubar.Item,
    SubItem: Menubar.SubItem,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Menubar.Root>;

export const Default: StoryObj<typeof Menubar.Root> = {
  render: () => (
    <div className="h-[800px] bg-[#1e1e1e]">
      <Menubar.Root>
        <Menubar.Header>
          <Menubar.HeaderLeft>
            <img
              src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
              alt="TecSinapse"
              className={'w-auto h-giga mx-kilo'}
            />
          </Menubar.HeaderLeft>
          <Menubar.Search className="mr-kilo hidden sm:flex text-default" />
          <Menubar.HeaderRight>
            <Tooltip
              text={
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
              }
            >
              <Avatar name={'RC'} />
            </Tooltip>
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
            <Avatar name={'RC'} />
          </Menubar.HeaderRight>
        </Menubar.Header>
        <Menubar.DropdownRoot
          options={EXAMPLE_MENU}
          mostUsed={MOST_USED}
          labelMostUsed={'Mais acessados'}
        />
      </Menubar.Root>
    </div>
  ),
};

const isFeatured = (title: string) => {
  return (
    <>
      {title === 'Item menu 1' ? (
        <Tag.Root label={'Novo'} variants={{ intent: 'success' }} />
      ) : (
        <></>
      )}
    </>
  );
};

const isHighlighted = (title: string) => (
  <>
    {title.includes('Item de') ? (
      <FaStar className={'text-primary-medium'} />
    ) : (
      <></>
    )}
  </>
);

export const Custom: StoryObj<typeof DropdownRoot> = {
  render: () => (
    <div className="h-[800px]">
      <Menubar.Root>
        <Menubar.Header>
          <Menubar.HeaderLeft>
            <img
              src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
              alt="TecSinapse"
              className={'w-auto h-giga ml-kilo mr-tera'}
            />
          </Menubar.HeaderLeft>
          <Menubar.Search placeholder={'Busque um item do menu'} />
          <Menubar.HeaderRight>
            <Avatar name={'Elon'} />
            <Avatar name={'Musk'} />
            <Avatar name={'Bill'} />
            <Avatar name={'Gates'} />
          </Menubar.HeaderRight>
        </Menubar.Header>
        <Menubar.Dropdown>
          <Menubar.MostUsed label={'Mais acessados'}>
            {MOST_USED.map(item => (
              <Menubar.MostUsedItem
                title={item.title}
                category={item.category}
                anchorProps={item.anchorProps}
              />
            ))}
          </Menubar.MostUsed>
          <Menubar.Categories>
            {EXAMPLE_MENU.map(item => (
              <Menubar.Category
                title={item.title}
                options={item.items}
                render={({ items, title, ...rest }) => {
                  return (
                    <>
                      <Menubar.Item
                        {...rest}
                        title={title}
                        parentCategoryTitle={item.title}
                        subItems={items ?? []}
                        className={'flex flex-row items-center gap-x-deca'}
                        renderSubItems={item => {
                          return (
                            <Menubar.SubItem
                              {...item}
                              className={
                                'flex flex-row items-center gap-x-deca'
                              }
                            >
                              {item.title}
                              <FaStar className={'text-primary-medium'} />
                            </Menubar.SubItem>
                          );
                        }}
                      >
                        {isHighlighted(title)}
                        {title}
                        {isFeatured(title)}
                      </Menubar.Item>
                    </>
                  );
                }}
              />
            ))}
          </Menubar.Categories>
        </Menubar.Dropdown>
      </Menubar.Root>
    </div>
  ),
};
