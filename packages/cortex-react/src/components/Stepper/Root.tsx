import React, { useState, useMemo, useCallback } from 'react';
import { Node } from './Node';

export interface StepRootProps {
  segmented?: boolean;
  children: React.ReactNode;
}

export const Root = ({ segmented = false, children }: StepRootProps) => {
  const initialSelectedIndex = useMemo(() => {
    let initialIndex: number | null = null;
    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child) && child.props.selected) {
        initialIndex = index;
      }
    });
    return initialIndex;
  }, [children]);

  const [selectedNode, setSelectedNode] = useState<number | null>(
    initialSelectedIndex
  );
  const childrenCount = useMemo(
    () => React.Children.count(children),
    [children]
  );

  const handleNodeClick = useCallback((index: number, onClick?: () => void) => {
    setSelectedNode(index);
    if (onClick) {
      onClick();
    }
  }, []);

  const renderNode = useMemo(
    () => (child: React.ReactNode, index: number) => {
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
    },
    [childrenCount, selectedNode, segmented]
  );

  return (
    <div className="flex w-full space-x-2 bg-white p-4 pb-2 rounded-mili">
      {React.Children.map(children, renderNode)}
    </div>
  );
};
