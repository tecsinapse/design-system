import { tv } from 'tailwind-variants';
export const groupButton = tv({
  slots: {
    button:
      'border-[1px] border-secondary-light px-centi py-mili items-center flex',
    inactive: 'bg-white',
    firstButton: 'first:rounded-l-mili first:border-r-0',
    lastButton: 'last:rounded-r-mili last:border-l-0',
    container: 'flex flex-row flex-1 h-[2rem] w-[500px]',
    active: 'text-white bg-gray-700',
  },
});
