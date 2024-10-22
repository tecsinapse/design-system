import React, { useState } from 'react';
import { Node } from './Node';

interface StepRootProps {
  segmented?: boolean;
  children: React.ReactNode;
}

export const Root = ({ segmented = false, children }: StepRootProps) => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const childrenCount = React.Children.count(children);

  const handleNodeClick = (index: number, onClick?: () => void) => {
    setSelectedNode(index);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex w-full space-x-2 bg-white p-4 pb-2 rounded-mili">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === Node) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isFirst: index === 0,
            isLast: index === childrenCount - 1,
            selected: selectedNode === index,
            segmented,
            onClick: () => handleNodeClick(index, child.props.onClick),
          });
        }

        return null;
      })}
    </div>
  );
};
