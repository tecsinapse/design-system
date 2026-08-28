import { FloatingPortal } from '@floating-ui/react';
import { Popover } from '../Popover';
import { ReactNode } from 'react';
import { usePhoneContext } from './context';
import { usePortalRoot } from '../../provider';

export const PhoneInputPopover = ({
  children,
  root,
}: {
  children: ReactNode;
  root?: HTMLElement | null;
}) => {
  const { triggerWidth } = usePhoneContext();
  const portalRoot = usePortalRoot();
  return (
    <FloatingPortal root={root ?? portalRoot ?? undefined}>
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
