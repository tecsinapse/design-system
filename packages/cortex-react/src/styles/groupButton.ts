import { tv } from 'tailwind-variants';
export const groupButton = tv({
  slots: {
    button:
      'border-[1px] border-secondary-medium px-centi py-mili items-center flex text-sub font-bold',
    inactive: 'bg-white text-secondary-medium disabled:bg-secondary-light',
    firstButton: 'first:rounded-l-mili first:border-r-0',
    lastButton: 'last:rounded-r-mili last:border-l-0',
    container: 'flex flex-row flex-1 h-[2rem] w-fit',
    active: 'text-white bg-secondary-medium',
  },
});
