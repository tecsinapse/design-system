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
  zIndex,
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
      zIndex,
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        progress: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      animation: {
        opacity: 'opacity 1s ease-in-out',
        progress: 'progress 1s infinite linear',
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
    },
  },
};

export default preset;
