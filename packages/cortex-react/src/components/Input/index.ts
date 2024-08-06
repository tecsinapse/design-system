import { InputBox } from './Box';
import { InputFace } from './Face';
import { InputLeft } from './Left';
import { InputMask } from './Mask';
import { InputRight } from './Right';
import { InputRoot } from './Root';
import { InputSearch } from './Search';

export const Input = {
  Root: InputRoot,
  Face: InputFace,
  Box: InputBox,
  Left: InputLeft,
  Right: InputRight,
  Search: InputSearch,
  Mask: InputMask,
};

export * from './masks';
export * from './types';
