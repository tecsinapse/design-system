export const defaultStyles = {
  transition: [
    'transform 200ms ease-in-out, opacity 200ms ease-in-out, visibility 200ms ease-in-out',
  ],
  overflow: 'hidden',
  visibility: 'hidden',
};

export const transition = {
  entering: {
    transform: 'translateY(-10%)',
    opacity: 0,
    visibility: 'hidden',
  },
  entered: { transform: 'translateY(0%)', opacity: 1, visibility: 'visible' },
  exiting: { transform: 'translateY(0%)', opacity: 1, visibility: 'visible' },
  exited: { transform: 'translateY(-10%)', opacity: 0, visibility: 'hidden' },
};
