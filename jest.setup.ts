import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
