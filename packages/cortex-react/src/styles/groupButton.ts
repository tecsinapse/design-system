import { tv } from 'tailwind-variants';
export const groupButton = tv({
  slots: {
    button:
      'border-[1px] border-content-low px-centi py-mili items-center flex text-sub font-bold',
    inactive: 'bg-white text-content-low disabled:bg-content-minimal',
    firstButton: 'first:rounded-l-mili first:border-r-0',
    lastButton: 'last:rounded-r-mili last:border-l-0',
    container: 'flex flex-row h-[2rem]',
    active: 'text-white bg-content-low',
  },
});
