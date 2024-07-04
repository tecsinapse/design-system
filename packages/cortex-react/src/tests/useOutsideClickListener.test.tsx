import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { useOutsideClickListener } from '../hooks';

describe('useOutsideClickListener', () => {
  it('Should detect click outside element', () => {
    const onClickOutside = jest.fn();
    const ref = createRef<HTMLDivElement>();
    renderHook(() =>
      useOutsideClickListener({
        ref,
        onClickOutside,
      })
    );

    render(<div ref={ref}>test</div>);

    fireEvent.click(document.body);

    expect(onClickOutside).toHaveBeenCalled();
  });

  it('Should not detect click on element click', () => {
    const onClickOutside = jest.fn();
    const ref = createRef<HTMLDivElement>();
    renderHook(() =>
      useOutsideClickListener({
        ref,
        onClickOutside,
      })
    );

    render(<div ref={ref}>test</div>);

    const divElement = screen.getByText('test');

    fireEvent.click(divElement);

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
