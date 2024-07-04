import React, { ElementType, useState } from 'react';
import { Button } from './Button';
import SearchInput from './SearchInput';
import { Avatar } from './Avatar';
import clsx from 'clsx';
import { Card } from './Card';
import Masonry from './Masonry';
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
  IoMenu,
} from 'react-icons/io5';

export type MostUsedType = {
  title: string;
  category: string;
  /** Wrapping component for element. This is used for navigation */
  Component: ElementType;
  /** Properties spread to wrapping Component */
  props: any;
};

export type ItemsOptions = {
  title: string;
  /** Wrapping component for element. This is used for navigation */
  Component: ElementType;
  /** Properties spread to wrapping Component */
  props: any;
  rightComponents?: React.ReactNode;
  items?: ItemsOptions[];
};

export type OptionsType = {
  title: string;
  items: ItemsOptions[];
  leftComponents?: React.ReactNode;
};

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  options: OptionsType[];
  /** Limited to first 4 elements */
  mostUsed?: MostUsedType[];
  mostUsedLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchResultsLabel?: string;
}

const MoreAccess = () => (
  <div className={'mb-kilo'}>
    <p className={'font-bold mb-centi'}>Mais acessados</p>
    <div className={'gap-x-kilo flex flex-row'}>
      <Card className={'flex-1 py-mili '}>
        <p className={'text-primary-medium font-bold'}>Title</p>
        <p className={'text-secondary-medium'}>description</p>
      </Card>
      <Card className={'flex-1 py-mili'}>
        <p className={'text-primary-medium font-bold'}>Title</p>
        <p className={'text-secondary-medium'}>description</p>
      </Card>
      <Card className={'flex-1 py-mili'}>
        <p className={'text-primary-medium font-bold'}>Title</p>
        <p className={'text-secondary-medium'}>description</p>
      </Card>
      <Card className={'flex-1 py-mili'}>
        <p className={'text-primary-medium font-bold'}>Title</p>
        <p className={'text-secondary-medium'}>description</p>
      </Card>
    </div>
  </div>
);

const MenuBlock = (op: OptionsType) => {
  return (
    <>
      <p className={'mb-mili font-bold'}>{op.title}</p>
      <hr className={'mb-mili'} />
      <div className={'flex flex-col gap-y-mili'}>
        {op.items.map(i => {
          return <MenuItem {...i} key={i.title} />;
        })}
      </div>
    </>
  );
};

const IconControlSubItem = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const props = {
    className: 'text-primary-medium hover:cursor-pointer',
    onClick: () => setShow(!show),
  };
  return show ? (
    <IoCaretUpCircleOutline {...props} />
  ) : (
    <IoCaretDownCircleOutline {...props} />
  );
};

const MenuItem = (i: ItemsOptions) => {
  const [show, setShow] = useState(false);
  const hasSubItems = (i?.items ?? []).length > 0;

  return (
    <>
      <div className={'flex flex-row gap-x-deca items-center'}>
        <p
          onClick={() => {
            if (hasSubItems) setShow(!show);
          }}
          key={i.title}
          className={clsx(
            'text-secondary-dark hover:text-primary-medium hover:cursor-pointer text-base',
            show && 'text-primary-medium' // TODO: Verificar pq não funciona
          )}
        >
          {i.title}
        </p>
        {hasSubItems ? (
          <IconControlSubItem show={show} setShow={setShow} />
        ) : (
          <></>
        )}
      </div>
      {show ? <SubItem {...i} /> : <></>}
    </>
  );
};

const SubItem = (itemOption: ItemsOptions) => {
  return (
    <>
      {(itemOption?.items ?? []).map(item => {
        return (
          <p
            className={
              'pl-deca text-sub border-l-[1px] border-primary-medium text-secondary-dark active:bg-red-500'
            }
            key={item.title}
          >
            {item.title}
          </p>
        );
      })}
    </>
  );
};

export const MenuBar = (props: MenubarProps) => {
  const { options } = props;
  const [show, setShow] = useState(false);
  const animate = clsx(
    'transition-all ease-in-out duration-250',
    show
      ? 'translate-y-0 opacity-1 visible'
      : '-translate-y-[120%] opacity-0 invisible'
  );

  return (
    <div className={''}>
      {/*<Menubar.Header>*/}
      {/*  <Menubar.Left></Menubar.Left>*/}
      {/*  <Input/>*/}
      {/*  <Menubar.Right></Menubar.Right>*/}
      {/*</Menubar.Header>*/}
      {/*<Menubar.body>*/}
      {/*  {mostUsed.map(....)}*/}
      {/*  {options.map(....)}*/}
      {/*</Menubar.body>*/}
      <div
        className={
          'w-screen px-kilo py-deca flex flex-row justify-between bg-white'
        }
      >
        <Button variants={{ size: 'square' }} onClick={() => setShow(!show)}>
          <IoMenu size={16} />
        </Button>
        {/*Menubar.left*/}
        <div className={'flex items-center w-fit'}>
          <img
            src="https://www.tecsinapse.com.br/wp-content/themes/tecsinapse/img/logo.svg"
            alt="TecSinapse"
            className={'w-auto h-giga ml-kilo mr-tera'}
          />
        </div>
        {/*Menubar.left*/}
        <SearchInput
          placeholder={'O que você deseja buscar?'}
          className={clsx('mr-tera flex-1', animate)}
        />
        {/*Menubar.Rigth*/}
        <div className={'flex items-center gap-x-deca'}>
          <Avatar name={'RC'} />
          <Avatar name={'RC'} />
          <Avatar name={'RC'} />
          <Avatar name={'RC'} />
        </div>
        {/*Menubar.Rigth*/}
      </div>
      <div
        className={clsx(
          'w-full bg-white flex-1 pt-kilo pb-mega shadow-default px-[8vw]',
          animate
        )}
      >
        <MoreAccess />
        <div className={'gap-x-deca flex flex-row'}>
          <div className={'flex-1 gap-y-mili'}>
            <Masonry columns={4}>
              {options.map(op => (
                <MenuBlock {...op} key={op.title} />
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
};
