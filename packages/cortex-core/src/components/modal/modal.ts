import { tv } from 'tailwind-variants';

export const modal = tv({
  base: 'inset-x-0 fixed mx-auto rounded-micro p-kilo bg-white shadow-default flex transition fixed invisible peer-checked:visible scale-0 peer-checked:scale-100',
});
