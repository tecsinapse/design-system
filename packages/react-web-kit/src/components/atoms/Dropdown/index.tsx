import * as React from 'react';
import { StyledContainerDropdown } from './styled';
import { Transition } from 'react-transition-group';
import { defaultStyles, transition } from '../../molecules/Select/animations';
import { Dispatch, SetStateAction } from 'react';
import { useClickAwayListener } from '@tecsinapse/react-web-kit';

export interface DropdownProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Component: React.FC<DropdownProps & { children: JSX.Element }> = ({
  visible,
  setVisible,
  children,
}): JSX.Element => {
  const refDropDown = React.useRef(null);
  useClickAwayListener(refDropDown, setVisible);

  return (
    <Transition in={visible} timeout={300}>
      {state => (
        <StyledContainerDropdown
          style={{ ...defaultStyles, ...transition['bottom'][state] }}
          ref={refDropDown}
        >
          {children}
        </StyledContainerDropdown>
      )}
    </Transition>
  );
};

export const Dropdown = Component;
