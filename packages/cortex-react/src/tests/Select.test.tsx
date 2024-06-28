import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Select } from '../components/Select';

const mockOptions = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
];

const mockGroupedOptions = new Map();
mockGroupedOptions.set('Group 1', [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
]);
mockGroupedOptions.set('Group 2', [
  { id: '4', name: 'Option 4' },
  { id: '5', name: 'Option 5' },
  { id: '6', name: 'Option 6' },
]);

const keyExtractor = (option: { id: string }) => option.id;
const labelExtractor = (option: { name: string }) => option.name;
const groupedLabelExtractor = (value: string) => value;

describe('Select', () => {
  it('renders correctly with default label', () => {
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={jest.fn()}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
      />
    );

    const selectElement = screen.getByText('Select an option');

    expect(selectElement).toBeInTheDocument();
  });

  it('opens and closes dropdown on button click', () => {
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={jest.fn()}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByRole('select')).toHaveClass('visible');

    fireEvent.click(button);
    expect(screen.queryByRole('select')).toHaveClass('invisible');
  });

  it('select renders all options', () => {
    const onSelectMock = jest.fn();
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={onSelectMock}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
      />
    );

    mockOptions.map(option =>
      expect(screen.getByText(option.name)).toBeInTheDocument()
    );
  });

  it('selects an option and closes dropdown', () => {
    const onSelectMock = jest.fn();
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={onSelectMock}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('select')).toHaveClass('visible');

    fireEvent.click(screen.getByText('Option 1'));

    expect(onSelectMock).toHaveBeenCalledWith(mockOptions[0]);
    expect(screen.queryByRole('select')).toHaveClass('invisible');
  });

  it('renders selected option placeholder', () => {
    render(
      <Select
        label="Select an option"
        value={mockOptions[0]}
        onSelect={() => undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
      />
    );

    const selectPlaceholderElement = screen.getByTestId('select-placeholder');

    expect(selectPlaceholderElement).toHaveTextContent(mockOptions[0].name);
  });

  it('renders grouped options correctly', () => {
    render(
      <Select<{ id: string; name: string }>
        label="Select an option"
        value={undefined}
        onSelect={jest.fn()}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        groupedLabelExtractor={groupedLabelExtractor}
        options={mockGroupedOptions}
        grouped
      />
    );

    [...(mockGroupedOptions ?? [])].map(([key, value]) => {
      expect(screen.getByText(key));
      value.map(option => expect(screen.getByText(option.name)));
    });
  });

  it('renders search input and its placeholder when onSearch prop is provided', () => {
    const placeholderText = 'Search input';
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={jest.fn()}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
        onSearch={jest.fn()}
        placeholderSearchInput={placeholderText}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('select')).toHaveClass('visible');

    const searchInputElement = screen.getByPlaceholderText(placeholderText);

    expect(searchInputElement).toBeInTheDocument();
  });

  it('renders hint with error icon for error variant', () => {
    render(
      <Select
        label="Select an option"
        value={undefined}
        onSelect={jest.fn()}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        options={mockOptions}
        hint="This is an error"
        variant="error"
      />
    );

    const hintElement = screen.getByText('This is an error');
    const iconElement = screen.getByTestId('select-hint-error-icon');

    expect(hintElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });
});
