export const defaultStyleCircle = {
  transition: `transform ${100}ms ease`,
};

export const transitionStylesCircle = {
  entering: { transform: 'translateX(0%)' },
  entered: { transform: 'translateX(100%)' },
  exiting: { transform: 'translateX(100%)' },
  exited: { transform: 'translateX(0%)' },
};
