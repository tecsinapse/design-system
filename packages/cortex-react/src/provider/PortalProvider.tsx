import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Holds an HTMLElement that FloatingPortal-based components should portal into.
 * Used by web-component hosts that mount into a Shadow DOM and need portal
 * children to inherit scoped styles instead of `document.body` defaults.
 */
const PortalRootContext = createContext<HTMLElement | null>(null);

export interface PortalProviderProps {
  /** DOM element where FloatingPortal children should render.
   *  When `null`, FloatingPortal falls back to its `document.body` default. */
  root: HTMLElement | null;
  children: ReactNode;
}

export const PortalProvider = ({ root, children }: PortalProviderProps) => (
  <PortalRootContext.Provider value={root}>
    {children}
  </PortalRootContext.Provider>
);

/**
 * Reads the configured portal root. Returns `null` when no `PortalProvider`
 * ancestor exists — components must fall back to `document.body` in that case
 * for backwards compatibility with consumers that don't opt in.
 */
export const usePortalRoot = (): HTMLElement | null =>
  useContext(PortalRootContext);
