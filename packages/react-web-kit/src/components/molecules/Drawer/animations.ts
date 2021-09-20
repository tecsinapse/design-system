export const transformLeftRigthClose = (anchorPosition: string) =>
  anchorPosition === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

export const transformLeftRigthOpen = 'translateX(0)';

export const transformTopBottomClose = (anchorPosition: string) =>
  anchorPosition === 'top' ? 'translateY(-100%)' : 'translateY(100%)';

export const transformTopBottomOpen = 'translateY(0%)';

export const defaultStylesLeftRight = (anchorPosition: string) => {
  return {
    transition: 'transform 300ms ease-in-out',
    transform: () => transformLeftRigthClose(anchorPosition),
    overflowX: 'hidden',
    overflowY: 'auto',
  };
};

export const transitionStylesLeftRight = (anchorPosition: string) => {
  return {
    entering: { transform: transformLeftRigthClose(anchorPosition) },
    entered: {
      transform: transformLeftRigthOpen,
    },
    exiting: {
      transform: transformLeftRigthOpen,
    },
    exited: { transform: transformLeftRigthClose(anchorPosition) },
  };
};

export const defaultStylesTopBottom = (anchorPosition: string) => {
  return {
    transition: 'transform 300ms ease-in-out',
    transform: transformTopBottomClose(anchorPosition),
    overflowX: 'hidden',
    overflowY: 'auto',
  };
};
export const transitionStylesTopBottom = (anchorPosition: string) => {
  return {
    entering: { transform: transformTopBottomClose(anchorPosition) },
    entered: {
      transform: transformTopBottomOpen,
    },
    exiting: {
      transform: transformTopBottomOpen,
    },
    exited: { transform: transformTopBottomClose(anchorPosition) },
  };
};
