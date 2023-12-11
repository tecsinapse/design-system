import { tv } from 'tailwind-variants';

export const drawer = tv({
  base: 'bg-white fixed h-full p-deca left-0 top-0 shadow-lg transition-all duration-500 transform -translate-x-full peer-checked:translate-x-0 rounded-r-mili',
});

export const overlay = tv({
  base: 'fixed h-full w-full left-0 top-0 peer-checked:bg-black peer-checked:bg-opacity-50 z-[-1]',
});
