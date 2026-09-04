import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from './ProgressBar';

const fillNode = (root: ReturnType<typeof render>['root']) =>
  root.findAll((n) => !!n.props?.className?.includes('h-full'))[0];

describe('ProgressBar', () => {
  it('renders the container with token sizing', () => {
    const { getByTestId } = render(<ProgressBar testID="p" valueNow={50} />);
    const className = getByTestId('p').props.className as string;
    expect(className).toContain('h-mili');
    expect(className).toContain('rounded-mili');
    expect(className).toContain('flex-row');
  });
  it('fills the fill segment with the color tone class', () => {
    const { root } = render(
      <ProgressBar valueNow={50} color="success" colorTone="dark" />,
    );
    const className = fillNode(root).props.className as string;
    expect(className).toContain('bg-success-dark');
  });
  it('sizes the fill width to the value percentage', () => {
    const { root } = render(<ProgressBar valueNow={50} />);
    const style = fillNode(root).props.style;
    expect(style.width).toBe('50%');
  });
  it('parses a percentage string valueNow', () => {
    const { root } = render(<ProgressBar valueNow="75%" />);
    const style = fillNode(root).props.style;
    expect(style.width).toBe('75%');
  });
});
