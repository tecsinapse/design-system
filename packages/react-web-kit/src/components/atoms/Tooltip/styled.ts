import { css } from '@emotion/react';
import { StyleProps, ThemeProp } from '@tecsinapse/react-core';
import styled from '@emotion/styled';
import { ComputedType, MaxWidth, Position } from './Tooltip';

type InjectedProps = {
  computed?: ComputedType;
  position?: Position;
  maxWidth?: MaxWidth;
};

/** Bottom/Top commons */
const bottomOrTopStylesCommon = (width: number, position) =>
  ['top', 'bottom'].includes(position as Position) &&
  css`
    left: 50%;
    margin-left: -${width / 2}px;
  `;

const bottomOrTopArrowCommon = (position?: Position) =>
  ['top', 'bottom'].includes(position as Position) &&
  css`
    left: 50%;
    margin-left: -5px;
  `;

/** Top */
const topStyles = (theme: ThemeProp, position?: Position) =>
  position === 'top' &&
  css`
    bottom: 100%;
    margin-bottom: ${theme.spacing.centi};
    transform: translateY(10%);
  `;

const topArrow = (theme: ThemeProp, position?: Position) =>
  position === 'top' &&
  css`
    top: 100%;
    border-color: ${theme.color.secondary.xdark} transparent transparent
      transparent;
  `;

/** Bottom */
const bottomStyles = (theme: ThemeProp, position?: Position) =>
  position === 'bottom' &&
  css`
    top: 100%;
    margin-top: ${theme.spacing.centi};
    transform: translateY(-10%);
  `;

const bottomArrow = (theme: ThemeProp, position?: Position) =>
  position === 'bottom' &&
  css`
    bottom: 100%;
    border-color: transparent transparent ${theme.color.secondary.xdark}
      transparent;
  `;

/** Bottom/Top commons */
const leftAndRightCommonStyles = (height: number, position?: Position) =>
  ['right', 'left'].includes(position as Position) &&
  css`
    top: 50%;
    margin-top: -${height / 2}px;
  `;

const leftOrRightArrowCommon = (position?: Position) =>
  ['right', 'left'].includes(position as Position) &&
  css`
    top: 50%;
    margin-top: -5px;
  `;

/** Left */
const leftStyles = (theme: ThemeProp, position?: Position) =>
  position === 'left' &&
  css`
    right: 100%;
    margin-right: ${theme.spacing.centi};
    transform: translateX(10%);
  `;

const leftArrow = (theme: ThemeProp, position?: Position) =>
  position === 'left' &&
  css`
    left: 100%;
    border-color: transparent transparent transparent
      ${theme.color.secondary.xdark};
  `;

/** Right */
const rightStyles = (theme: ThemeProp, position?: Position) =>
  position === 'right' &&
  css`
    left: 100%;
    margin-left: ${theme.spacing.centi};
    transform: translateX(-10%);
  `;

const rightArrow = (theme: ThemeProp, position?: Position) =>
  position === 'right' &&
  css`
    right: 100%;
    border-color: transparent ${theme.color.secondary.xdark} transparent
      transparent;
  `;

export const TooltipSpan = styled('span')<Partial<StyleProps> & InjectedProps>(
  ({ theme, computed, position, maxWidth }) => {
    const { width = 0, height = 0 } = computed || {};
    return css`
      max-width: ${maxWidth ? `${maxWidth}px` : 'auto'};
      position: absolute;
      width: max-content;
      line-break: anywhere;
      padding: ${theme.spacing.micro} ${theme.spacing.centi};
      border-radius: ${theme.borderRadius.mili};
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
      background-color: ${theme.color.secondary.xdark};
      z-index: ${theme.zIndex.absolute};

      ${bottomOrTopStylesCommon(width, position)}
      ${bottomStyles(theme, position)}
      ${topStyles(theme, position)}
      
      ${leftAndRightCommonStyles(height, position)}
      ${leftStyles(theme, position)}
      ${rightStyles(theme, position)}

      &::after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 5px;

        ${bottomOrTopArrowCommon(position)}
        ${bottomArrow(theme, position)}
        ${topArrow(theme, position)}
        
        ${leftOrRightArrowCommon(position)}
        ${leftArrow(theme, position)}
        ${rightArrow(theme, position)}
      }
    `;
  }
);

export const Container = styled('div')<{
  position?: Position;
}>`
  position: relative;
  width: auto;
  &:hover {
    & > span {
      opacity: 1;
      visibility: visible;
      display: flex;
      transform: ${({ position }) =>
        position === 'left' || position === 'right'
          ? 'translateX(0%)'
          : 'translateY(0%)'};
    }
  }
`;
