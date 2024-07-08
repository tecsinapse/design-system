import React from 'react';
import { StoryFn } from '@storybook/react';
import { Menubar, Avatar, Tag } from '../src';
import { FaStar } from 'react-icons/fa';
import { EXAMPLE_MENU, MOST_USED } from './menuBarMocks';

export default {
  title: 'Cortex/Menubar/Custom',
  component: Menubar.DropdownRoot,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: StoryFn = () => {
  return (
    <>
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
                href={item.href}
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
                        {title.includes('Item de') ? (
                          <FaStar className={'text-primary-medium'} />
                        ) : (
                          <></>
                        )}
                        {title}
                        {title === 'Item menu 1' ? (
                          <Tag
                            label={'Novo'}
                            variants={{ intent: 'success' }}
                          />
                        ) : (
                          <></>
                        )}
                      </Menubar.Item>
                    </>
                  );
                }}
              />
            ))}
          </Menubar.Categories>
        </Menubar.Dropdown>
      </Menubar.Root>
    </>
  );
};

export const Base = {
  render: Template,
};
