import React, { FC } from 'react';
import { StyledContainerDrawer } from './styled';

interface DrawerProps {
  expanded: boolean;
  openMenu?: () => void;
}

const Drawer: FC<DrawerProps> = () => {
  const [expanded, setExpanded] = React.useState<boolean>(true);

  if (expanded) {
    return <StyledContainerDrawer variant={'left'} />;
  } else {
    return <h1>iuu</h1>;
  }
};

export default Drawer;
