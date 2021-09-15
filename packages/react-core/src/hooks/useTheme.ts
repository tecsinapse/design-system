import { useTheme as useEmotionTheme } from '@emotion/react';
import { ThemeProp } from '../types/defaults';

export const useTheme = () => useEmotionTheme() as ThemeProp;
