import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import {
  PortalProvider,
  usePortalRoot,
  useResolvedPortalRoot,
  type PortalRoot,
} from '../provider';

const useCaptured = <T,>(hookFn: () => T) => {
  let captured: T | undefined;
  const Probe = () => {
    captured = hookFn();
    return null;
  };
  return { Probe, read: () => captured };
};

describe('PortalProvider', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <PortalProvider root={document.createElement('div')}>
        <span>inside</span>
      </PortalProvider>
    );
    expect(getByText('inside')).toBeInTheDocument();
  });

  describe('usePortalRoot', () => {
    it('returns null when no PortalProvider ancestor exists', () => {
      const { Probe, read } = useCaptured(() => usePortalRoot());
      render(<Probe />);
      expect(read()).toBeNull();
    });

    it('returns the provider root when wrapped', () => {
      const root = document.createElement('div');
      const { Probe, read } = useCaptured(() => usePortalRoot());
      render(
        <PortalProvider root={root}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBe(root);
    });

    it('exposes null when provider is wrapped with null root', () => {
      const { Probe, read } = useCaptured(() => usePortalRoot());
      render(
        <PortalProvider root={null}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBeNull();
    });

    it('exposes a RefObject when provider is wrapped with one', () => {
      const ref = createRef<HTMLDivElement>();
      const target = document.createElement('div');
      ref.current = target;
      const { Probe, read } = useCaptured(() => usePortalRoot());
      render(
        <PortalProvider root={ref}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBe(ref);
    });
  });

  describe('useResolvedPortalRoot', () => {
    it('falls back to the PortalProvider root when local root is omitted', () => {
      const root = document.createElement('div');
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(undefined));
      render(
        <PortalProvider root={root}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBe(root);
    });

    it('returns null when no provider and local root is omitted', () => {
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(undefined));
      render(<Probe />);
      expect(read()).toBeNull();
    });

    it('escapes the PortalProvider when local root is explicit null', () => {
      const providerRoot = document.createElement('div');
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(null));
      render(
        <PortalProvider root={providerRoot}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBeNull();
    });

    it('returns the local HTMLElement when provided (overrides provider)', () => {
      const providerRoot = document.createElement('div');
      const localRoot = document.createElement('div');
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(localRoot));
      render(
        <PortalProvider root={providerRoot}>
          <Probe />
        </PortalProvider>
      );
      expect(read()).toBe(localRoot);
    });

    it('passes a RefObject through unchanged for FloatingPortal to resolve', () => {
      const ref = createRef<HTMLDivElement>();
      const target = document.createElement('div');
      ref.current = target;
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(ref));
      render(<Probe />);
      expect(read()).toBe(ref);
      expect((read() as PortalRoot)).toBe(ref);
    });

    it('passes a RefObject with null current through unchanged', () => {
      const ref = createRef<HTMLDivElement>();
      // ref.current intentionally null
      const { Probe, read } = useCaptured(() => useResolvedPortalRoot(ref));
      render(<Probe />);
      const result = read() as React.RefObject<HTMLDivElement | null>;
      expect(result).toBe(ref);
      expect(result.current).toBeNull();
    });
  });
});
