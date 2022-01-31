export const defaultStyleOverlay = {
  transition: `opacity 800ms ease-in-out, visibility 600ms ease-in-out`,
  opacity: 0,
  visibility: 'hidden',
};

export const transitionStylesOverlay = {
  entering: { opacity: 1, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 0, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};
