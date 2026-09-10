import { FloatingPortal } from '@floating-ui/react';
import { Popover } from '../Popover';
import { usePhoneContext } from './context';
import { useResolvedPortalRoot } from '../../provider';
import type { PhoneInputPopoverProps } from './types';

export const PhoneInputPopover = ({ children, root }: PhoneInputPopoverProps) => {
  const { triggerWidth } = usePhoneContext();
  const portalRoot = useResolvedPortalRoot(root);
  return (
    <FloatingPortal root={portalRoot}>
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
