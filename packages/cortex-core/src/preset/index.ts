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
    },
  },
};
