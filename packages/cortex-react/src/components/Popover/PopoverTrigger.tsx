import React, { useEffect } from 'react';
import { usePopoverContext } from './PopoverContext';

interface PopoverTriggerProps {
  children: React.ReactElement;
  trigger: 'hover' | 'click';
}

const PopoverTrigger = ({ children, trigger }: PopoverTriggerProps) => {
  const { triggerProps, setTrigger } = usePopoverContext();

  useEffect(() => {
    if (setTrigger) {
      setTrigger(trigger);
    }
  }, [trigger, setTrigger]);

  return React.cloneElement(children, triggerProps);
};

export default PopoverTrigger;
