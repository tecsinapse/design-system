// Storybook's web runtime (bundled by @storybook/react-native) expects a browser
// environment. In React Native `window === global`, and browser globals like
// `document`, `location`, and `history` are absent. This shim must run BEFORE any
// Storybook module is imported, because the preview captures `globalThis.document`
// at module-load time (so late shims on `global.document` are invisible to it).
//
// `document.activeElement` is also required by react-international-phone on Hermes.

const locationShim = {
  href: 'app:///',
  origin: '',
  protocol: 'app:',
  host: '',
  hostname: '',
  port: '',
  pathname: '/',
  search: '',
  hash: '',
  reload() {},
  replace() {},
  assign() {},
};

const historyShim = {
  length: 0,
  state: null,
  scrollRestoration: 'auto',
  back() {},
  forward() {},
  go() {},
  pushState() {},
  replaceState() {},
};

global.location = global.location || locationShim;
global.history = global.history || historyShim;

const noop = () => {};
const noopWithReturn = () => null;

const makeStyle = () => {
  const style = {
    setProperty: noop,
    removeProperty: noop,
    getPropertyValue: () => '',
    cssText: '',
  };
  return style;
};

const makeElement = () => ({
  style: makeStyle(),
  dataset: {},
  className: '',
  id: '',
  textContent: '',
  innerHTML: '',
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  appendChild: noop,
  removeChild: noop,
  insertBefore: noop,
  setAttribute: noop,
  removeAttribute: noop,
  getAttribute: noopWithReturn,
  addEventListener: noop,
  removeEventListener: noop,
  focus: noop,
  blur: noop,
});

if (!global.document) {
  global.document = {};
}
global.document.activeElement = null;
global.document.location = global.document.location || global.location;
global.document.title = '';
global.document.documentElement =
  global.document.documentElement || makeElement();
global.document.body = global.document.body || makeElement();
global.document.head = global.document.head || makeElement();

global.document.addEventListener = global.document.addEventListener || noop;
global.document.removeEventListener =
  global.document.removeEventListener || noop;
global.document.querySelector = global.document.querySelector || noopWithReturn;
global.document.querySelectorAll =
  global.document.querySelectorAll || (() => []);
global.document.getElementById =
  global.document.getElementById || noopWithReturn;
global.document.createElement = global.document.createElement || makeElement;
global.document.createElementNS =
  global.document.createElementNS || makeElement;

global.addEventListener = global.addEventListener || noop;
global.removeEventListener = global.removeEventListener || noop;
global.matchMedia =
  global.matchMedia ||
  (() => ({
    matches: false,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
  }));

global.CSS = global.CSS || { escape: s => String(s), supports: () => false };
if (typeof global.innerHeight !== 'number') global.innerHeight = 0;
if (typeof global.innerWidth !== 'number') global.innerWidth = 0;
if (typeof global.devicePixelRatio !== 'number') global.devicePixelRatio = 1;
if (typeof global.scrollTo !== 'function') global.scrollTo = noop;
