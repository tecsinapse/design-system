import React from 'react';
import { DefaultProps } from './interface';
import { mostUsed } from '../../styles/menubar';
import { MostUsedItemProps } from './MostUsedItem';

interface MostUsedProps extends DefaultProps {
  label?: string;
  children?: React.ReactNode;
  options: MostUsedItemProps[];
}

const MostUsed = ({ label, children, ...rest }: MostUsedProps) => {
  const { container, label: labelClass, containerList } = mostUsed();
  return (
    <div className={container()} {...rest}>
      <p className={labelClass()}>{label}</p>
      <div className={containerList()}>{children}</div>
    </div>
  );
};

export default MostUsed;
