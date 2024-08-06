import React from 'react';
import { mostUsed } from '../../styles/menubar';
import { DefaultProps } from './interface';

const { container, label: labelClass, containerList } = mostUsed();

export interface MostUsedProps extends DefaultProps {
  label?: string;
  /** child element */
  children?: React.ReactNode;
}

const MostUsed = ({ label, children, ...rest }: MostUsedProps) => {
  return (
    <div className={container()} data-testid={'most-used-menubar'} {...rest}>
      <p className={labelClass()}>{label}</p>
      <div className={containerList()}>{children}</div>
    </div>
  );
};

export default MostUsed;
