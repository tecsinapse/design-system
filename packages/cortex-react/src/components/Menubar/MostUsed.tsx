import React from 'react';
import { DefaultProps } from './interface';
import { mostUsed } from '../../styles/menubar';

const { container, label: labelClass, containerList } = mostUsed();

export interface MostUsedProps extends DefaultProps {
  label?: string;
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
