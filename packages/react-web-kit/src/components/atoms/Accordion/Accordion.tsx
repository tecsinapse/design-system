import React, { useRef } from 'react';
import { Icon, Text, ThemeProp } from '@tecsinapse/react-core';
import {
  AccordionContainer,
  IconContainer,
  TitleContainer,
  ContentContainer,
} from './styled';
import { Transition } from 'react-transition-group';
import {
  contentStyle,
  contentTransition,
  titleStyle,
  titleTransition,
} from './animations';
import { useTheme } from '@emotion/react';

export interface AccordionProps {
  open?: boolean;
  onChange?: () => void;
  title: string;
  /** Transition time for collapse effect in ms */
  transition?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  open: _open = false,
  onChange,
  transition = 200,
  children,
}) => {
  const [open, setOpen] = React.useState(_open);
  const [contentHeight, setContentHeight] = React.useState(0);
  const theme = useTheme() as ThemeProp;

  const ref = useRef<HTMLDivElement | null>(null);

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
    <AccordionContainer>
      <TitleContainer onClick={handleClick}>
        <Transition in={open} timeout={transition}>
          {state => (
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
      <Transition in={open} timeout={transition}>
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
