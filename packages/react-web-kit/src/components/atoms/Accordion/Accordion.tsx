import React, { PropsWithChildren, useRef } from 'react';
import { Icon, Text, ThemeProp } from '@tecsinapse/react-core';
import {
  AccordionContainer,
  ContentContainer,
  IconContainer,
  TitleContainer,
} from './styled';
import { Transition } from 'react-transition-group';
import {
  contentStyle,
  contentTransition,
  titleStyle,
  titleTransition,
} from './animations';
import { useTheme } from '@emotion/react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onChange?: () => void;
  title: string;
  /** Transition time for collapse effect in ms */
  transition?: number;
}

const Accordion = ({
  title,
  open: _open = false,
  onChange,
  transition = 200,
  children,
  ...rest
}: PropsWithChildren<AccordionProps>) => {
  const [open, setOpen] = React.useState(_open);
  const [contentHeight, setContentHeight] = React.useState(0);
  const theme = useTheme() as ThemeProp;

  const ref = useRef<HTMLDivElement | null>(null);
  const titleTransitionRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => setOpen(_open), [_open]);

  React.useLayoutEffect(() => {
    const size = Array.from(
      (ref.current?.children || []) as HTMLCollection
    ).reduce((prev, curr) => prev + curr.clientHeight, 0);
    setContentHeight(size);
  }, []);

  const handleClick = React.useCallback(() => {
    if (onChange) {
      onChange();
      return;
    }
    setOpen(state => !state);
  }, [onChange]);

  return (
    <AccordionContainer {...rest}>
      <TitleContainer onClick={handleClick}>
        <Transition in={open} timeout={transition} nodeRef={titleTransitionRef}>
          {state => (
            <div ref={titleTransitionRef}>
              <Text
                typography="h4"
                fontWeight="bold"
                style={{
                  ...titleStyle(transition, theme),
                  ...titleTransition(theme)[state],
                }}
              >
                {title}
              </Text>
            </div>
          )}
        </Transition>
        <IconContainer>
          <Icon
            type="material-community"
            name={open ? 'chevron-up' : 'chevron-down'}
            size="kilo"
            fontColor="medium"
          />
        </IconContainer>
      </TitleContainer>
      <Transition in={open} timeout={transition} nodeRef={ref}>
        {state => (
          <ContentContainer
            ref={htmlEl => (ref.current = htmlEl)}
            style={{
              ...contentStyle(open, transition, contentHeight, theme),
              ...contentTransition(contentHeight, theme)[state],
            }}
          >
            {children}
          </ContentContainer>
        )}
      </Transition>
    </AccordionContainer>
  );
};

export default Accordion;
