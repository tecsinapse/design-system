import styled from '@emotion/styled';
import { hex2rgba, StyleProps } from '@tecsinapse/react-core';
import { SelectProps } from '../Select';
import { css } from '@emotion/react';

type InjectedProps = Partial<
  StyleProps &
    SelectProps<unknown, 'single' | 'multi'> & { lengthOptions: number }
>;

const anchorBottom = ({
  theme,
  anchor,
}: StyleProps & Omit<InjectedProps, 'theme'>) =>
  anchor === 'bottom' &&
  css`
    margin-top: ${theme.spacing.centi};
    top: 100%;
  `;

const anchorTop = ({
  theme,
  anchor,
}: StyleProps & Omit<InjectedProps, 'theme'>) =>
  anchor === 'top' &&
  css`
    margin-bottom: ${theme.spacing.centi};
    bottom: 100%;
  `;

export const StyledContainerDropdown = styled('div')<InjectedProps>`
  width: 100%;
  background-color: ${({ theme }: StyleProps) =>
    theme.miscellaneous.surfaceColor};
  border-radius: ${({ theme }: StyleProps) => theme.borderRadius.mili};
  box-shadow: 0 2px 8px
    ${({ theme }: StyleProps) => hex2rgba(theme.miscellaneous.shadow, 0.08)};
  position: absolute;
  padding-top: ${({
    theme,
    hideSearchBar,
  }: StyleProps & Partial<SelectProps<unknown, 'single' | 'multi'>>) =>
    !hideSearchBar ? `${theme.spacing.deca}` : '0px'};
  padding-bottom: ${({ theme }: StyleProps) => theme.spacing.mili};
  z-index: ${({ theme }: StyleProps) => theme.zIndex.select};
  ${anchorTop}
  ${anchorBottom}
`;

export const OptionsContainer = styled('div')<InjectedProps>`
  max-height: 250px;
  top: 100%;
  overflow-y: ${({ lengthOptions = 0 }: InjectedProps) =>
    lengthOptions > 5 ? 'scroll' : 'hidden'};
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }: StyleProps) => theme.borderRadius.centi};
    background-color: ${({ theme }: StyleProps) => theme.color.secondary.light};
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }: StyleProps) => theme.color.primary.light};
  },
`;

export const SearchBarContainer = styled('div')<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.mili};
  width: 100%;
`;

export const PaddedContainer = styled('div')<Partial<StyleProps>>`
  padding: ${({ theme }) => `${theme.spacing.mili} ${theme.spacing.deca}`};
`;

export const StyledContainerCheckAll = styled(PaddedContainer)<
  Partial<StyleProps>
>`
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary.xlight};
  }
  &:hover span {
    color: ${({ theme }) => theme.color.primary.medium};
  }
`;

export const StyledSpan = styled('span')<Partial<StyleProps>>`
  color: ${({ theme }) => theme.font.color.dark};
  padding: ${({ theme }) => `${theme.spacing.mili} 0px`};
`;

export const StyledContainerTextLabel = styled('div')<Partial<StyleProps>>`
  padding-left: ${({ theme }) => theme.spacing.mili};
  width: 100%;
  display: flex;
  overflow: hidden;
`;
