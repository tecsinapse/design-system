import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TextArea } from '../components';

describe('TextArea Component', () => {
  it('Should render component correctly', () => {
    render(<TextArea.Root label="Test Label" name="test-textarea" />);
    const textAreaElement = screen.getByTestId('textarea-box');
    expect(textAreaElement).toBeInTheDocument();
  });

  it('Should render label', () => {
    const label = 'Test Label';
    render(<TextArea.Root label={label} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it('Should render placeholder', () => {
    render(<TextArea.Root placeholder="Test Placeholder" />);
    const textAreaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textAreaElement).toBeInTheDocument();
  });

  it('Should apply custom className', () => {
    render(<TextArea.Root className="bg-red-500" name="test-textarea" />);
    const faceElement = screen.getByTestId('textarea-face');
    expect(faceElement).toHaveClass('bg-red-500');
  });

  it('Should handles text input correctly', () => {
    render(<TextArea.Root name="test-textarea" />);
    const textAreaElement = screen.getByTestId('textarea-box');

    fireEvent.change(textAreaElement, { target: { value: 'New text' } });

    expect(textAreaElement).toHaveValue('New text');
  });
});
