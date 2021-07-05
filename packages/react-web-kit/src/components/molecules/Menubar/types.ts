import React, { ElementType } from 'react';

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
