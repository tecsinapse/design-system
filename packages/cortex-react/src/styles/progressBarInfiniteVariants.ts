import { tv } from 'tailwind-variants';

export const progressBarVariants = tv({
  slots: {
    container: 'relative mb-mili',
    bar: 'h-1.5 w-full overflow-hidden',
    progress: 'w-full h-full origin-left-right rounded-b-mili',
  },
  variants: {
    status: {
      uploading: {
        progress: 'bg-info-medium animate-progress',
      },
      success: {
        progress: 'bg-success-medium',
      },
      error: {
        progress: 'bg-error-medium',
      },
    },
  },
});
