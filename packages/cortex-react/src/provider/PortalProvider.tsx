import React, { createContext, useContext, ReactNode, RefObject } from 'react';

/**
 * Mount-node target accepted by `<PortalProvider>` and by FloatingPortal-based
 * components' `root` prop. Mirrors @floating-ui/react's own `FloatingPortal` API.
 */
export type PortalRoot = HTMLElement | RefObject<HTMLElement | null> | null;

const PortalRootContext = createContext<PortalRoot>(null);

export interface PortalProviderProps {
  /** DOM element (or ref to one) where FloatingPortal children should render.
   *  When `null`, FloatingPortal falls back to its `document.body` default. */
  root: PortalRoot;
  children: ReactNode;
}

export const PortalProvider = ({ root, children }: PortalProviderProps) => (
  <PortalRootContext.Provider value={root}>
    {children}
  </PortalRootContext.Provider>
);

/**
 * Reads the closest `<PortalProvider>`'s root. Returns `null` when no
 * `PortalProvider` ancestor exists — consumers must fall back to `document.body`
 * in that case for backwards compatibility with consumers that don't opt in.
 */
export const usePortalRoot = (): PortalRoot => useContext(PortalRootContext);

/**
 * Resolves the FloatingPortal mount node for a consumer.
 *
 * Distinguishes the three intent shapes a consumer can express via `root`:
 *
 * - `root === undefined` (omitted): falls back to the closest `<PortalProvider>`'s
 *   root. If no provider is in the tree, returns `null` so FloatingPortal falls
 *   through to its `document.body` default.
 * - `root === null` (explicit opt-out): returns `null` even when a
 *   `<PortalProvider>` ancestor is in the tree, escaping the provider and
 *   landing in `document.body`.
 * - `root` is `HTMLElement` or `RefObject`: returned as-is.
 *
 * Without this hook, the naive `root ?? portalRoot ?? undefined` chain collapses
 * the `null` opt-out into the provider fallback, defeating the escape hatch.
 */
export const useResolvedPortalRoot = (
  root: PortalRoot | undefined
): PortalRoot => {
  const portalRoot = usePortalRoot();
  if (root === undefined) return portalRoot;
  return root;
};
