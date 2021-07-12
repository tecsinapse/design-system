import { MostUsedType, OptionsType } from './types';

export const filterAndTransform = (
  options: OptionsType[],
  search: string
): MostUsedType[] => {
  const normalized: MostUsedType[] = [];
  options.forEach(option => {
    option.items.forEach(item => {
      if (item.title.toLowerCase().startsWith(search)) {
        normalized.push({
          title: item.title,
          Component: item.Component,
          props: item.props,
          category: option.title,
        });
      }
      item.items?.forEach(sub => {
        if (sub.title.toLowerCase().startsWith(search)) {
          normalized.push({
            title: sub.title,
            Component: sub.Component,
            props: sub.props,
            category: option.title,
          });
        }
      });
    });
  });

  return normalized;
};
