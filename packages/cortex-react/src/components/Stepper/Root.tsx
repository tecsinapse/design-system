import React, { useCallback, useMemo, useState } from 'react';
import { Node, StepNodeProps } from './Node';
import clsx from 'clsx';

export interface StepRootProps {
  /** child element */
  children: React.ReactNode;
  segmented?: boolean;
  className?: string;
  interactive?: boolean;
}

export const Root = ({
  segmented = false,
  children,
  className = '',
  interactive = true,
}: StepRootProps) => {
  const initialSelectedIndex = useMemo(() => {
    let initialIndex: number | null = null;
    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<StepNodeProps>;
        if (element.props.selected) {
          initialIndex = index;
        }
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

  const handleNodeClick = useCallback(
    (index: number, onClick?: () => void) => {
      if (interactive) {
        setSelectedNode(index);
        if (onClick) {
          onClick();
        }
      }
    },
    [interactive]
  );

  const renderNode = useMemo(
    () => (child: React.ReactNode, index: number) => {
      if (React.isValidElement(child) && child.type === Node) {
        const element = child as React.ReactElement<StepNodeProps>;
        return React.cloneElement(element, {
          isFirst: index === 0,
          isLast: index === childrenCount - 1,
          selected: selectedNode === index,
          segmented,
          interactive,
          onClick: () => handleNodeClick(index, element.props.onClick as any),
        });
      }
      return null;
    },
    [childrenCount, selectedNode, segmented, interactive]
  );

  return (
    <div
      className={clsx(
        'flex w-full space-x-2 bg-surface-overlay p-4 pb-2 rounded-mili',
        className
      )}
    >
      {React.Children.map(children, renderNode)}
    </div>
  );
};
