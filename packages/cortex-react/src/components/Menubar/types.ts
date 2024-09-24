import React, { Dispatch, ReactNode } from 'react';
import { CardProps } from '../Card';

export interface DefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: ReactNode;
}

export interface MenuItem extends DefaultProps {
  title: string;
  items?: MenuItem[];
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  [key: string]: unknown;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface DropdownRootProps {
  labelMostUsed?: string;
  mostUsed?: MostUsedItemProps[];
  options: MenuCategory[];
}

export type CategoryType<T> = {
  title: string;
  options: T[];
  render: (prop: T) => ReactNode;
};

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** child element */
  children?: ReactNode;
}

export interface ItemLinkProps {
  /** link to redirect */
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  /** child element */
  children?: React.ReactNode;
}

export interface MostUsedItemProps extends CardProps {
  title: string;
  category: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export interface MostUsedProps extends DefaultProps {
  label?: string;
  /** child element */
  children?: React.ReactNode;
}

export interface RootProps {
  /** child element */
  children?: ReactNode;
}

export interface SubItemProps extends DefaultProps {
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export interface IconControlSubItemProps {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}

export interface ItemProps<T> extends DefaultProps {
  /** child element */
  children?: React.ReactNode;
  subItems?: T[];
  renderSubItems?: (prop: T) => React.ReactNode;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
