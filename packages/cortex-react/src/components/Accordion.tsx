import clsx from 'clsx';
import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

interface AccordionProps {
  /**
   * Content children
   */
  children?: React.ReactNode;
  /**
   * The default position for the Accordion will be in opened mode
   * default: `false`
   */
  defaultOpen?: boolean;
  /**
   * If floating trigger is provided, no label is displayed
   */
  label?: string;
  /**
   * Show floating arrow in Trigger instead of default labeled mode
   * default: `false`
   */
  floating?: boolean;
  /**
   * Callback executed on accordion `open` event
   * @returns void
   */
  onOpen?: () => void;
}

const Context = createContext<{
  open: boolean;
  toggle?: () => void;
}>({ open: false });

export const useAccordionContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAccordionContext must be used within a Accordion');
  }
  return context;
};

const Trigger = ({
  label,
  floating = false,
  /**
   * Only applied to trigger arrow
   */
  className,
  onOpen,
}: Pick<AccordionProps, 'floating' | 'label' | 'onOpen'> & {
  /**
   * Only applied to trigger arrow
   */
  className?: string;
}) => {
  const { open, toggle } = useAccordionContext();
  if (!floating && !label) {
    throw new Error(
      'A label must be specified if the trigger is not floating variant'
    );
  }

  const action = () => {
    if (!open) {
      onOpen?.();
    }
    toggle?.();
  };

  return (
    <div
      className={clsx(
        'flex flex-col justify-between align-center px-mili border-r border-secondary-light cursor-pointer',
        { 'mr-deca': floating }
      )}
      onClick={action}
    >
      <div
        className={clsx(
          'rounded-mili border border-secondary-light flex align-center justify-center p-micro',
          {
            'absolute -translate-x-micro translate-y-deca bg-white': floating,
          },
          className
        )}
      >
        <LiaAngleRightSolid
          className={clsx(
            'text-secondary-medium transition-transform duration-200',
            {
              'rotate-180': open,
            }
          )}
        />
      </div>
      {!floating ? (
        <span className="-rotate-180 [writing-mode:vertical-lr]">{label}</span>
      ) : null}
    </div>
  );
};

const Content = ({ children }: Pick<AccordionProps, 'children'>) => {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string | null>(null);
  const { open } = useAccordionContext();

  useLayoutEffect(() => {
    const size = Array.from(
      (container.current?.children || []) as HTMLCollection
    ).reduce((prev, curr) => prev + curr.clientWidth, 0);
    setWidth(`${size}px`);
  }, []);

  return (
    <div
      className={clsx(
        `overflow-hidden transition-[width] ease-in-out duration-200`,
        { [`w-[${width}]`]: !!width && open },
        { 'w-0': !open }
      )}
      ref={container}
      data-testid="accordion-container"
    >
      {children}
    </div>
  );
};

const Face = ({
  children,
  defaultOpen = false,
}: Pick<AccordionProps, 'children' | 'defaultOpen'>) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <Context.Provider value={{ open, toggle }}>
      <div className="flex flex-row">{children}</div>
    </Context.Provider>
  );
};

const Root = ({
  children,
  defaultOpen,
  label,
  floating,
  onOpen,
}: AccordionProps) => {
  return (
    <Face defaultOpen={defaultOpen}>
      <Trigger label={label} floating={floating} onOpen={onOpen} />
      <Content>{children}</Content>
    </Face>
  );
};

export const Accordion = {
  Face,
  Root,
  Trigger,
  Content,
};
