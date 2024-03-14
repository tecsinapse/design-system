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
        bottomToTop: {
          '0%': { opacity: 0, transform: 'translateY(100%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        bottomToTop: 'bottomToTop 1s ease-in-out',
      },
    },
  },
};

export default preset;
