import { tv } from 'tailwind-variants';

export const tHead = tv({
  base: '[&>tr]:rounded-none [&>tr]:shadow-none',
});

export const tRow = tv({
  base: 'rounded-mili shadow-default',
});
export const tHeadCell = tv({
  base: 'truncate px-deca py-centi text-start text-sub font-bold text-medium',
});
export const tCell = tv({
  base: 'p-deca text-base font-bold text-dark',
});

export const tFoot = tv({
  base: '[&>tr]:rounded-none [&>tr]:shadow-none',
});
export const tRoot = tv({
  base: 'border-separate border-spacing-x-[22px] border-spacing-y-mili rounded-mili bg-white px-0 py-centi shadow-default',
});
export const hr = tv({
  base: '-mx-[24px] -mb-[4px] -mt-[50px] h-[42px] border-0 bg-secondary-xlight',
});
