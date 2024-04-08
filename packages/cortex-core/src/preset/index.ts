import {
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  colors,
  fontFamily,
  fontSize,
  spacing,
  textColor,
} from '../tokens/definitions';

const preset = {
  theme: {
    fontFamily,
    extend: {
      colors,
      textColor,
      spacing,
      borderRadius,
      borderWidth,
      fontSize,
      boxShadow,
      borderColor,
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        opacity: 'opacity 1s ease-in-out',
      },
    },
  },
};

export default preset;
