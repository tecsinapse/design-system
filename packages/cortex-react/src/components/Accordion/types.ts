export interface AccordionProps {
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
   * Shows a border on the trigger
   * @default true
   */
  showArrowBorder?: boolean;
  /**
   * Shows a divider on the trigger
   * @default true
   */
  showDivider?: boolean;
  /**
   * Aligns the trigger to the left
   * @default true
   */
  arrowPosition? : 'left' | 'right';
  /**
   * Callback executed on accordion `open` event
   * @returns void
   */
  onOpen?: () => void;
  /**
   * Callback executed on accordion `close` event
   * @returns void
   */
  onClose?: () => void;
  /**
   * invert direction of arrow
   * default: `false`
   */
  invertedArrow?: boolean;
  /**
   * accordion direction
   * default: `horizontal`
   */
  direction?: 'vertical' | 'horizontal';
}
