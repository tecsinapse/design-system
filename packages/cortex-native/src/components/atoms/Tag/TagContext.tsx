import { createContext, useContext } from 'react';

export interface TagContextValue {
  handleDismiss: () => void;
}

export const TagContext = createContext<TagContextValue | undefined>(undefined);

export const useTagContext = (): TagContextValue => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('Tag parts must be used within <Tag.Root>');
  }
  return context;
};
