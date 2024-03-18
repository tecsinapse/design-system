import { ClassProp, createTV, VariantProps } from 'tailwind-variants';
import { fontSize } from '../../tokens/definitions';

const myTV = createTV({
  twMergeConfig: {
    //passar tema?
    classGroups: {
      'font-size': [{ text: Object.keys(fontSize) }],
    },
  },
});

const tagStyles = myTV({
  base: 'rounded-micro px-micro py-nano w-fit font-bold text-label items-center flex',
  variants: {
    intent: {
      success: 'bg-success-medium text-white',
      primary: 'bg-primary-medium text-white',
      secondary: 'bg-secondary-medium text-white',
      info: 'bg-info-medium text-white',
      white: 'bg-white text-secondary-medium',
    },
  },
  defaultVariants: {
    intent: 'secondary',
  },
});

export type TagVariants = VariantProps<typeof tagStyles> & ClassProp;

/**
 * Represents the tag component with specified variants.
 * @param {TagVariants} props - The properties for the tag component.
 * @param {string=} [props.intent=secondary] -  The intent variant for the tag (e.g., success, primary, secondary, info, white).
 * @param {string=} [props.className] - The additional CSS classes for the tag.
 * @param {string=} [props.class] - The additional CSS classes for the tag.
 */
export const tag = (props: TagVariants) => tagStyles(props);
