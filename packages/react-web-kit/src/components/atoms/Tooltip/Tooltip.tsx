import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { Container, TooltipSpan } from './styled';

export type ComputedType = { width?: number; height?: number };
export type Position = 'top' | 'bottom' | 'right' | 'left';
export type MaxWidth = number;

export interface ITooltip {
  title: string;
  position?: Position;
  children?: React.ReactNode;
  maxWidht?: MaxWidth;
}

const Tooltip: React.FC<ITooltip> = ({
  children,
  title,
  maxWidht,
  position = 'bottom',
}) => {
  const spanRef = React.useRef<HTMLSpanElement | null>(null);
  const [computed, setComputed] = React.useState<ComputedType | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
    setComputed({
      width: spanRef.current?.clientWidth,
      height: spanRef.current?.clientHeight,
    });
  }, []);

  return (
    <Container position={position}>
      {children}
      <TooltipSpan
        maxWidth={maxWidht}
        computed={computed}
        position={position}
        ref={ref => {
          spanRef.current = ref;
        }}
      >
        <Text
          fontWeight="bold"
          typography="base"
          colorVariant="secondary"
          colorTone="xlight"
        >
          {title}
        </Text>
      </TooltipSpan>
    </Container>
  );
};

export default Tooltip;
