import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Select } from '../components';
import SearchInput from '../components/SearchInput';

type SelectOption = {
  id: string;
  name: string;
};

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

const keyExtractor = (option: SelectOption) => option.id;
const labelExtractor = (option: SelectOption) => option.name;

const groupedLabelExtractor = (value: string) => value;

describe('Select', () => {
  const onSelectMock = jest.fn();

  it('Should render with default label', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={jest.fn()} />
        </Select.Popover>
      </Select.Root>
    );

    const selectElement = screen.getByText('Select an option');

    expect(selectElement).toBeInTheDocument();
  });

  it('Should open and close popover on button click', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={jest.fn()} />
        </Select.Popover>
      </Select.Root>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const popover = screen.getByTestId('select-popover');
    expect(popover).toHaveClass('visible');
    fireEvent.click(button);
    expect(popover).toHaveClass('invisible');
  });

  it('Should render all options', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    mockOptions.map(option =>
      expect(screen.getByText(option.name)).toBeInTheDocument()
    );
  });

  it('Should select an option and closes popover', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    fireEvent.click(screen.getByRole('button'));
    const popover = screen.getByTestId('select-popover');
    expect(popover).toHaveClass('visible');
    fireEvent.click(screen.getByText('Option 1'));
    expect(onSelectMock).toHaveBeenCalledWith(mockOptions[0]);
    expect(popover).toHaveClass('invisible');
  });

  it('Should render selected option as placeholder', () => {
    render(
      <Select.Root
        value={mockOptions[0]}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    const selectPlaceholderElement = screen.getByTestId('select-placeholder');
    expect(selectPlaceholderElement).toHaveTextContent(mockOptions[0].name);
  });

  it('Should render all grouped options correctly', () => {
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <Select.GroupedOptions
            options={mockGroupedOptions}
            onSelect={onSelectMock}
            groupedLabelExtractor={groupedLabelExtractor}
          />
        </Select.Popover>
      </Select.Root>
    );
    [...(mockGroupedOptions ?? [])].map(([key, value]) => {
      expect(screen.getByText(key));
      value.map(option => expect(screen.getByText(option.name)));
    });
  });

  it('Should render component inside popover', () => {
    const placeholderText = 'Search input';
    render(
      <Select.Root
        value={undefined}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
      >
        <Select.Trigger label="Select an option" />
        <Select.Popover>
          <SearchInput placeholder={placeholderText} />
          <Select.Options options={mockOptions} onSelect={onSelectMock} />
        </Select.Popover>
      </Select.Root>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('select-popover')).toHaveClass('visible');
    const searchInputElement = screen.getByPlaceholderText(placeholderText);
    expect(searchInputElement).toBeInTheDocument();
  });
});
