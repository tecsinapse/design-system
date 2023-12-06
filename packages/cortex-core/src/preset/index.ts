import {
  colors,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  fontSize,
  spacing,
  fontFamily,
  textColor,
} from '../tokens/definitions';

module.exports = {
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
