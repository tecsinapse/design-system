/**
 * react-international-phone is a web library. Its `usePhoneInput` hook touches
 * `document.activeElement` (inside a microtask). React Native polyfills
 * `window` (window === global) but not `document`, and Hermes throws a
 * ReferenceError for an unresolvable `document` reference — not undefined.
 *
 * Shimming `global.document` prevents the unhandled promise rejection.
 */
const globalScope = globalThis as typeof globalThis & {
  document?: { activeElement: unknown };
};

if (typeof globalScope.document === 'undefined') {
  globalScope.document = { activeElement: null } as typeof globalScope.document;
}
