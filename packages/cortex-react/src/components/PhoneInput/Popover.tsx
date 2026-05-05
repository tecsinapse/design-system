import { FloatingPortal } from '@floating-ui/react';
import { Popover } from '../Popover';
import { ReactNode } from 'react';
import { usePhoneContext } from './context';

export const PhoneInputPopover = ({ children }: { children: ReactNode }) => {
  const { triggerWidth } = usePhoneContext();
  return (
    <FloatingPortal>
      <Popover.Content
        className="bg-surface-overlay shadow-md rounded-md overflow-hidden h-full max-h-[30vh] outline-none z-9999"
        style={{
          width: triggerWidth ? `${triggerWidth}px` : 'auto',
        }}
      >
        {children}
      </Popover.Content>
    </FloatingPortal>
  );
};
