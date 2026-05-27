/**
 * react-international-phone touches `document` (e.g. document.activeElement) even on RN.
 * Hermes throws ReferenceError if `document` is missing — not undefined.
 */
const globalScope = globalThis as typeof globalThis & {
  document?: { activeElement: unknown };
};

if (typeof globalScope.document === 'undefined') {
  globalScope.document = { activeElement: null } as typeof globalScope.document;
}
