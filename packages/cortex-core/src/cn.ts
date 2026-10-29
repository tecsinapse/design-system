import type { ClassValue } from 'tailwind-variants';

import { tv } from './tv';

/**
 * Tailwind-conflict-resolving class merger. Drop-in replacement for `clsx`
 * that additionally removes losing classes when two arguments conflict, so
 * a consumer's `className` reliably overrides a component's base classes
 * instead of depending on CSS source order.
 *
 * Derived from `tv` on purpose: it shares the `twMergeConfig` that teaches
 * tailwind-merge our custom typography scale (`text-h1`, `text-label`, ...).
 * A separately-constructed merger would misclassify those as text colors and
 * silently drop them whenever a color class appears in the same output.
 *
 * Callers must pass the consumer's `className` LAST — merge order decides the
 * winner.
 */
const merge = tv({});

export const cn = (...inputs: ClassValue[]): string =>
  merge({ class: inputs }) ?? '';
